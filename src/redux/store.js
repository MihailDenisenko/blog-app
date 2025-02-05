import { configureStore } from "@reduxjs/toolkit";
import newCount from "./slice/slice";
import isLogined from "./slice/logined";



export const store = configureStore({
  reducer: {
    newCount,
    isLogined,
    
  }
})