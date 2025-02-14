import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  article: null,
  articlePage: 1,
  articlesCount:0,
  tags: ['',]
}

const articleSlise = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {
    setArticle(state, action) {
      state.article = action.payload
    },
    setTagsOfArticles(state, action) { 
      state.tags[action.payload[0]] = action.payload[1];  
    },
    deleteTag(state, action) {
      const newTags = state.tags.filter((tag, i) => i !== action.payload)
      state.tags = newTags
    },
    addTag(state, action) {
      state.tags = [...state.tags, '']
    }, 
    setArticlePage(state, action) {
      state.articlePage = action.payload
    },
    setArticlesCount(state, action) {
      state.articlesCount = action.payload
    },
    resetTags(state) {
      state.tags = [''];
    },
    setTags(state, action) {
  state.tags = action.payload
}
  }
})

export const { setArticle, setTagsOfArticles, deleteTag,addTag, setArticlePage, setArticlesCount, resetTags, setTags } = articleSlise.actions

export default articleSlise.reducer