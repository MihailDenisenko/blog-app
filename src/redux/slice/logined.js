import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogined: false,
	userNickName: null,
	userPassword: null,
};

const isLogined = createSlice({
	name: 'isLogined',
	initialState,
	reducers: {
		setIsLogined(state) {
			state.isLogined = true;
		},
		setLogOut(state) {
			state.isLogined = false;
		},
		setUserData(state, action) {
			const { username, password } = action.payload;
      
      if (username==='Mike' && password ==='1234'){ 
  			state.userNickName = username;
        state.userPassword = password;
        state.isLogined = true
      }
		},
	},
});

export const { setIsLogined, setLogOut, setUserData } = isLogined.actions

export default isLogined.reducer