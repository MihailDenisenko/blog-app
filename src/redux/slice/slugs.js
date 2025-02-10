import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	slugs: [],
	slug: null,
};

const slugsSlice = createSlice({
	name: 'slugSlice',
	initialState,
	reducers: {
		setNewSlug(state, action) {},
	},
});

export const { setNewSlug } = slugsSlice.actions

export default slugsSlice.reducer