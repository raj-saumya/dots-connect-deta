import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    r_setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { r_setSocket } = gameSlice.actions;

export const game = gameSlice.reducer;
