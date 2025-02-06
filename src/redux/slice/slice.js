/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rootUrl: 'https://blog-platform.kata.academy/api',
  countBlogs: 0
}

const newCount = createSlice({
  name: 'newCount',
  initialState,
  reducers: {
    newCounerPlus(state, action) {
      state.count +=1
    },
    setCountBlogs(state, action) {
      state.countBlogs = action.payload
    }
  },
})

export const { newCounerPlus, setCountBlogs } = newCount.actions;

export default newCount.reducer