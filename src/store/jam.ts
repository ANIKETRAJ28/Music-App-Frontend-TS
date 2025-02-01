import { createSlice } from "@reduxjs/toolkit";

const initialState: { joinedJam: null | string } = {
  joinedJam: localStorage.getItem("joinedJam"),
};

const jamSlice = createSlice({
  name: "jam",
  initialState,
  reducers: {
    joinJam: (state, action) => {
      state.joinedJam = action.payload;
      localStorage.setItem("joinedJam", action.payload);
    },
    leaveJam: (state) => {
      state.joinedJam = null;
      localStorage.removeItem("joinedJam");
    },
  },
});

export const { joinJam, leaveJam } = jamSlice.actions;
export const Jam = jamSlice.reducer;
