import React from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// INITIAL STATE

//  BOOK
const initialBook = {
  coverURL: "",
  title: "",
  description: "",
  published_date: "",
  modified_date: "",
  author: "",
  publisher: "",
  language: "",
};

// CURRENT PAGE
const initialCurrentLocation = {
  chapterName: "-",
  currentPage: 0,
  totalPage: 0,
  startCfi: "",
  endCfi: "",
  base: "",
};

// COLOR LIST
const initialColorList = [
  { name: "Red", code: "#FF0000" },
  { name: "Orange", code: "#FFA500" },
  { name: "Yellow", code: "#FFFF00" },
  { name: "Green", code: "#008000" },
  { name: "Blue", code: "#0000FF" },
  { name: "Purple", code: "#800080" },
];

// FINAL INITIOAL STATE
const initialState = {
  book: initialBook,
  currentLocation: initialCurrentLocation,
  toc: [],
  highlights: [],
  colorList: initialColorList,
};

// SLICE

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Book  @dispatch
    updateBook(state, action) {
      state.book = action.payload;
    },
    // CurrentPage @dispatch
    updateCurrentPage(state, action) {
      state.currentLocation = action.payload;
    },
    // Book  @dispatch
    clearBook(state) {
      state.book = initialBook;
    },
    // Table of content @dispatch
    updateToc(state, action) {
      state.toc = action.payload;
    },
    // clear Table of content @dispatch
    clearToc(state) {
      state.toc = [];
    },
    // push Highlight @dispatch
    pushHighlight(state: any, action) {
      const check = state.highlights.filter(
        (h: any) => h.key === action.payload.key
      );
      if (check.length > 0) return;
      state.highlights.push(action.payload);
    },
    // update Highlight @dispatch
    updateHighlight(state: any, action: any) {
      const new_idx: any = action.payload.key;
      const old_idx = state.highlights.map((h: any) => h.key).indexOf(new_idx);
      state.highlights.splice(old_idx, 1, action.payload);
      //state.highlights.splice(old_idx, 0);
    },
    // remove Highlight @dispatch
    popHighlight(state, action) {
      const idx = state.highlights
        .map((h: any) => h.key)
        .indexOf(action.payload);
      state.highlights.splice(idx, 1);
    },
    //first time set highlight
    getHighlight(state, action) {
      state.highlights = action.payload;
    },
    // remove note content
    removeNoteContent(state, action) {
      state.highlights.map((highlight) => {
        highlight.note_content = highlight.note_content.filter(
          (note) => note.id !== action.payload
        );
      });
    },
    // add note content
    addNoteContent(state, action) {      
      state.highlights.map((highlight) => {
        if (highlight.id === action.payload.bookMarkId) {
          highlight.note_content.push(action.payload.noteData);
        }
      });
    },
  },
});

export const {
  updateBook,
  clearBook,
  updateCurrentPage,
  updateToc,
  clearToc,
  pushHighlight,
  updateHighlight,
  popHighlight,
  getHighlight,
  removeNoteContent,
  addNoteContent,
} = bookSlice.actions;

export default bookSlice.reducer;
