import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	slugs: [],
	slug: null,
};

const slugsSlice = createSlice({
	name: 'slugSlice',
	initialState,
	reducers: {
		setNewSlug(state, action) {
			state.slug = action.payload;
		},
	},
});

export const { setNewSlug } = slugsSlice.actions;

export default slugsSlice.reducer;
