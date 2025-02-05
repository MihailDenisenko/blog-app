/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count:0
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