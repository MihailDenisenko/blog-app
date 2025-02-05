/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rootUrl: 'https://blog-platform.kata.academy/api',
}

const newCount = createSlice({
  name: 'newCount',
  initialState,
  reducers: {
    newCounerPlus(state, action) {
      state.count +=1
    },
  },
})

export const { newCounerPlus } = newCount.actions;

export default newCount.reducer