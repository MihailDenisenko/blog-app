// import { useDispatch, useSelector } from 'react-redux'

import styles from './App.module.scss'
import Posts from './components/Posts/Posts';
import NavigationPanel from './components/NavigationPanel/NavigationPanel';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ArticlePage from './components/ArticlePage/ArticlePage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import SignIn from './components/SignIn/SignIn';
import Registration from './components/Registation/Registration';
import Profile from './components/Profile/Profile';
import NewArticle from './components/NewArticle/NewArticle';
import { useSelector, useDispatch } from 'react-redux';
import NoLogined from './components/NoLogined/NoLogined';
import { setIsLogined } from './redux/slice/logined';
import React from 'react';
import axios from 'axios';
import { constructFrom } from 'date-fns';




function App() {
	const { isLogined } = useSelector(state => state.isLogined)
// 	const baseUrl = 'https://blog-platform.kata.academy/api';
// 	const dispatch = useDispatch();
// 	const username = 'rrrr';
// 	const password = 'rrrrrr';

// // profiles / { username };

// 	const email = 'r@r.rr';
// 	const token =
// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWIyZjViY2UxOGQwMWIwMDJiNzdjNSIsInVzZXJuYW1lIjoicnJyciIsImV4cCI6MTc0NDQ1NjAyNywiaWF0IjoxNzM5MjcyMDI3fQ.QkU_MFjZwm0yJz58pIm3cnQvOuQT_5PwBuFzYisiUvc';

// 	localStorage.getItem('login') === 'true' ? dispatch(setIsLogined()) : '';

// 	React.useEffect(() => {

// 		fetch(`${baseUrl}/users/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ user: { username, email, password } }),
//     }).then(resp=>resp.json()).then(json=>console.log(json))
// 	 },[])


	return (
		<>
			<NavigationPanel />
			<h1 className={styles.h1}>Здесь могла быть ваша реклама</h1>
			<Routes>
				<Route exact path='/' element={<HomePage />} />

				<Route exact path='/articles/' element={<Posts />} />
				<Route exact path='/articles/?offset=:page' element={<Posts />} />

				<Route exact path='/new-article/' element={isLogined ? <NewArticle /> : <NoLogined />} />
				<Route exact path='/articles/:slug/' element={<ArticlePage />} />
				<Route exact path='/articles/:slug/edit' element={<ArticlePage />} />

				<Route exact path='/signin/' element={<SignIn />} />
				<Route exact path='/signup/' element={<Registration />} />
				<Route exact path='/profile/' element={<Profile />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</>
	);
}

export default App;


// /articles/{slug}/edit