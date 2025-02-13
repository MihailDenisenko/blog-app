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
      console.log(state.article)
    },
    setTagsOfArticles(state, action) { 
      state.tags[action.payload[0]] = action.payload[1];  
      console.log(state.tags)
    },
    deleteTag(state, action) {
      const newTags = state.tags.filter((tag, i) => i !== action.payload)
      console.log(newTags)
      state.tags = newTags
    },
    addTag(state, action) {
      state.tags = [...state.tags, '']
      console.log(state.tags)
    }, 
    setArticlePage(state, action) {
      state.articlePage = action.payload
    },
    setArticlesCount(state, action) {
      state.articlesCount = action.payload
    },
    resetTags(state) {
      state.tags = [''];
    }

  }
})

export const { setArticle, setTagsOfArticles, deleteTag,addTag, setArticlePage, setArticlesCount, resetTags } = articleSlise.actions

export default articleSlise.reducer