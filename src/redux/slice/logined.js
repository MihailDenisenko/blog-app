import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogined:false
}

const isLogined = createSlice({
  name: 'isLogined',
  initialState,
  reducers: {
    setIsLogined(state) {
      state.isLogined = true
    },
    setLogOut(state) {
      state.isLogined = false
      
    }
  },
})

export const { setIsLogined, setLogOut } = isLogined.actions

export default isLogined.reducer