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
import { useSelector } from 'react-redux';
import NoLogined from './components/NoLogined/NoLogined';



function App() {
	const { isLogined } = useSelector(state => state.isLogined)
	
	
	return (
		<>
			<NavigationPanel />
			<h1 className={styles.h1}>Здесь могла быть ваша реклама</h1>
			<Routes>
				<Route exact path='/' element={<HomePage />} />

				<Route exact path='/articles/' element={<Posts />} />
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