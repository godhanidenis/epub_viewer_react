import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// INITIAL STATE

// MODAL
const initialModel = {
  fontsetting: false,
  bookmark: false,
  content: false,
};

// INITIAL BOOK STYLE
const initialBookStyle = {
  fontFamily: "Original",
  fontSize: 18,
  lineHeight: 1.4,
  marginHorizontal: 15,
  marginVertical: 5,
};

// BOOK OPTION LIKE PAGINATED AND SCROLL
const initialBookOption = {
  flow: "paginated",
  resizeOnOrientationChange: true,
  spread: "auto",
};

// FINAL INITIOAL STATE
const initialState = {
  model: initialModel,
  bookStyle: initialBookStyle,
  bookOption: initialBookOption,
};

// SLICE

const fontSlice = createSlice({
  name: "fontSetting",
  initialState,
  reducers: {
    handleModal(state, action) {
      for (const key in state.model) {
        if (key !== action.payload) {
          state.model[key] = false;
        }
      }
      state.model[action.payload] = !state.model[action.payload];
    },
    updateBookStyle(state, action) {
      state.bookStyle = action.payload;
    },
    updateBookOption(state, action) {
      state.bookOption.flow = action.payload;
    },
  },
});

export const { handleModal, updateBookStyle, updateBookOption } =
  fontSlice.actions;

export default fontSlice.reducer;
