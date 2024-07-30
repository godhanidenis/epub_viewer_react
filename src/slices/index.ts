import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// reducers
import book from "./book";
import fontSetting from "./fontSetting";

//  Root Reducer
const reducer = combineReducers({
  book,
  fontSetting,
});

export type RootState = ReturnType<typeof reducer>;

// Store
const store = configureStore({
  reducer,
});

export default store;
