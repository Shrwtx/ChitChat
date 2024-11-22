import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ApiError from "./utils/ApiError.js";
import errorHandler from "./utils/errorHandler.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Define allowed methods if needed
  },
});

const users = {};

// Function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

// ----------- Middlewares ----------
app.use(cors()); // Allow all CORS requests
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static("public"));

// --------- Import Routes -------------
import userRoute from "./routes/user.routes.js";
import messageRoute from "./routes/message.routes.js";
import aiRoute from "./routes/googleGemini.routes.js";

// ----------- Routes declaration ---------
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/ai", aiRoute);

// ----------- Handle incorrect endpoint and wrong API requests ----------
app.use("*", (req, res, next) => {
  const err = new ApiError(404, "fail", `Can't find ${req.originalUrl} on the server`);
  next(err);
});

// ----------------- Error handler ---------
app.use(errorHandler);

// --------- Export ----------
export { app, io, server };
