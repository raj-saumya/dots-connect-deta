import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlayer: "",
  playerList: [],
  playerTurn: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    r_setCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
    },
    r_setPlayerList: (state, action) => {
      if (!state.playerList.length) {
        state.playerTurn = action.payload;
      }
      state.playerList.push(action.payload);
    },
    r_setPlayerTurn: (state) => {
      state.playerTurn = state.playerList.filter(
        (d) => d !== state.playerTurn
      )[0];
    },
  },
});

export const { r_setCurrentPlayer, r_setPlayerList, r_setPlayerTurn } =
  gameSlice.actions;

export const game = gameSlice.reducer;
