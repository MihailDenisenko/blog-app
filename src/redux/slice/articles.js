import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: null
}

const articleSlise = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {
    setArticle(state, action) {
      state.article = action.payload
    }
  }
})