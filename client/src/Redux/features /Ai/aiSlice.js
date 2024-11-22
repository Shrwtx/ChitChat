import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectAi: false,
  aiData: [],
  loading: false,
  error: null,
};

export const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setSelectAi: (state, action) => {
      state.selectAi = action.payload;
    },
    setAiData: (state, action) => {
      state.aiData = action.payload;
    },
    setAiPreviousValue: (state, action) => {
      state.aiData = [...state.aiData, action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSelectAi,
  setAiData,
  setAiPreviousValue,
  setLoading,
  setError,
} = aiSlice.actions;

export default aiSlice.reducer;
