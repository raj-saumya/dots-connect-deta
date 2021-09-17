import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const getInitialState = (rows, cols) => {
  let arr = [];

  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < cols; j++) {
      arr[i][j] = {
        rightSet: false,
        downSet: false,
      };
    }
  }

  return arr;
};

const RIGHT = 0;
const DOWN = 1;
const rows = 5;
const cols = 5;

const initialState = {
  active: {
    row: null,
    col: null,
  },
  rows,
  cols,
  matrix: getInitialState(rows, cols),
  highlightedLines: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    r_set: (state, action) => {
      const { row, col } = action.payload;
      state.highlightedLines = [
        { row, col, dir: RIGHT },
        { row, col, dir: DOWN },
        { row: row - 1, col, dir: DOWN },
        { row, col: col - 1, dir: RIGHT },
      ].map(JSON.stringify);
      state.active.row = row;
      state.active.col = col;
    },
    r_drawline: (state, action) => {
      const { row, col } = action.payload;
      if (state.active.row === row && state.active.col - 1 === col) {
        state.matrix[row][col].rightSet = true;
      } else if (state.active.row === row && state.active.col + 1 === col) {
        state.matrix[state.active.row][state.active.col].rightSet = true;
      } else if (state.active.row - 1 === row && state.active.col === col) {
        state.matrix[row][col].downSet = true;
      } else {
        state.matrix[state.active.row][state.active.col].downSet = true;
      }
      state.highlightedLines = [];
      state.active.row = null;
      state.active.col = null;
    },
    r_reset: (state) => {
      state.highlightedLines = [];
    },
  },
});

export const { r_set, r_drawline, r_reset } = globalSlice.actions;

const global = globalSlice.reducer;

const reducer = combineReducers({ global });

const store = configureStore({
  reducer,
});

export default store;
