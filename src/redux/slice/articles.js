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
      console.log(state.article)
    }
  }
})

export const { setArticle } = articleSlise.actions

export default articleSlise.reducer