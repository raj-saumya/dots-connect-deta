import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlayer: "",
  playerList: [],
  playerTurn: "",
  totalMoves: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    r_setCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
      state.playerTurn = state.playerList[state.totalMoves];
    },
    r_setPlayerList: (state, action) => {
      if (!state.playerList.length) {
        state.playerTurn = action.payload;
      }
      state.playerList.push(action.payload);
    },
    r_setPlayerTurn: (state) => {
      state.totalMoves = (state.totalMoves + 1) % state.playerList.length;
      state.playerTurn = state.playerList[state.totalMoves];
    },
  },
});

export const { r_setCurrentPlayer, r_setPlayerList, r_setPlayerTurn } =
  gameSlice.actions;

export const game = gameSlice.reducer;
