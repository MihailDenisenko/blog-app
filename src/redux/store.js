import { configureStore } from '@reduxjs/toolkit';
import newCount from './slice/slice';
import isLogined from './slice/logined';
import articleSlice from './slice/articles';
import slugSlice from './slice/slugs';

export const store = configureStore({
	reducer: {
		newCount,
		isLogined,
		articles: articleSlice,
		slugs: slugSlice,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	// middleware:() => new Tuple(thunk, logger)
});
