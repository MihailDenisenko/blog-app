import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogined: false,
	userNickName: null,
	userEmail: null,
	userToken: null,
	userImage: null,
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
			const { username, token, email } = action.payload;
			state.userEmail = email;
			state.userNickName = username;
			state.userToken = token;
			state.isLogined = true;
			if (action.payload.image) state.userImage = action.payload.image;
		},
	},
	setUserImage(state, action) {
		state.userImage = action.payload;
	},
});

export const { setIsLogined, setLogOut, setUserData, setUserImage } = isLogined.actions;

export default isLogined.reducer;
