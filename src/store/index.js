import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { global } from "./board";
import { game } from "./game";

const reducer = combineReducers({ global, game });

const store = configureStore({
  reducer,
});

export default store;
