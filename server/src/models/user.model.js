import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "Hey there! I am using ChitChat",
  },
});
// ------------------- Hashed Password --------------------
userSchema.pre("save", async function (next) {
  // --------- check password is modified or not -----------
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const genSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, genSalt);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export { User };
