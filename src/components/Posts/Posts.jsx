/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import styles from './Posts.module.scss';
import PaginPage from '../Pagination/PaginPage';
import { useNavigate } from 'react-router-dom';
import { setArticlesCount } from '../../redux/slice/articles';

export default function Posts() {
	const { rootUrl } = useSelector((state) => state.newCount);
	const dispatch = useDispatch();
	const [blogs, setBlogs] = React.useState([]);
	const { articlePage } = useSelector((state) => state.articles);
	const navigate = useNavigate();
	const [start, setStart] = React.useState(true);
	const [token, setToken] = React.useState('');

	React.useEffect(() => {
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
				console.log(json.articles);
				// counts.map((c) => console.log(c.favoritesCount));
				dispatch(setArticlesCount(json.articlesCount));
				setBlogs(json.articles);
			});
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
					navigate(`/articles/?offset=${(articlePage) }`);
					console.log(resp.data.articles);
					setBlogs(resp.data.articles);
					dispatch(setArticlesCount(resp.data.articlesCount));
				});
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
			{blogs.length === 0 ? '' : <PaginPage />}
		</div>
	);
}
