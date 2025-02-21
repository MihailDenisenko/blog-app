/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import styles from './Posts.module.scss';
import PaginPage from '../Pagination/PaginPage';
import { useNavigate, useLocation } from 'react-router-dom';
import { setArticlesCount } from '../../redux/slice/articles';

export default function Posts() {
	const { rootUrl } = useSelector((state) => state.newCount);
	const dispatch = useDispatch();
	const [blogs, setBlogs] = React.useState([]);
	// const { articlePage } = useSelector((state) => state.articles);
	const navigate = useNavigate();
	const [start, setStart] = React.useState(true);
	const [token, setToken] = React.useState('');
	const [page, setPage] = React.useState(1);
	const [articlePage, setArticlePage] = React.useState(1);

	React.useEffect(() => {
		localStorage.getItem('page') !== null ? setArticlePage(Number(localStorage.getItem('page'))) : '';

		if (localStorage.getItem('jwt') !== null) {
			setToken(localStorage.getItem('jwt'));
		}
		
		fetch(`https://blog-platform.kata.academy/api/articles?limit=5&offset=${(articlePage - 1) * 5}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((resp) => resp.json())
			.then((json) => {
				const counts = json.articles;
				dispatch(setArticlesCount(json.articlesCount));
				setBlogs(json.articles);
			})
			.catch((e) => console.log(e));
	}, []);

	React.useEffect(() => {
		if (start !== true) {
			axios
				.get(`${rootUrl}/articles?limit=5&offset=${(articlePage - 1) * 5}`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				})
				.then((resp) => {
					navigate(`/articles/?offset=${articlePage}`);
					setBlogs(resp.data.articles);
					dispatch(setArticlesCount(resp.data.articlesCount));
				})
				.catch((e) => console.log(e));
		}
		setStart(false);
	}, [articlePage, token]);

	const post = blogs.map((p, i) => {
		const { slug, title, createdAt, description, body, tagList, author, favoritesCount, favorited } = p;
		return (
			<li key={i + 1}>
				<Post
					slug={slug}
					title={title}
					createdAt={createdAt}
					description={description}
					body={body}
					tagList={tagList}
					author={author}
					favoritesCount={favoritesCount}
					favorited={favorited}
				/>
			</li>
		);
	});

	return (
		<div>
			<ul className={styles.ul}>{post}</ul>
			{blogs.length === 0 ? '' : <PaginPage setArticlePage={setArticlePage} />}
		</div>
	);
}
