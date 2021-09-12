import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

const getInitialState = (rows, cols) => {
  let arr = [];

  for (let i = 0; i < rows; i++) {
    arr[i] = [];
    for (let j = 0; j < cols; j++) {
      arr[i][j] = {
        visible: false,
      };
    }
  }

  return arr;
};

const rows = 5;
const cols = 5;

const initialState = {
  rows,
  cols,
  matrix: getInitialState(rows, cols),
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    r_set: (state, action) => {
      const { row, col } = action.payload;
      state.matrix[row][col].visible = !state.matrix[row][col].visible;
    },
  },
});

export const { r_set } = globalSlice.actions;

const global = globalSlice.reducer;

const reducer = combineReducers({ global });

const store = configureStore({
  reducer,
});

export default store;
