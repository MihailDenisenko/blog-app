import { configureStore } from "@reduxjs/toolkit";
import newCount from "./slice/slice";
import isLogined from "./slice/logined";
import articleSlice from './slice/articles'

export const store = configureStore({
  reducer: {
    newCount,
    isLogined,
    articles: articleSlice,
        
  }
})