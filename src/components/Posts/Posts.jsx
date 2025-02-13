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

	React.useEffect(() => {
		axios.get(rootUrl + `/articles?limit=5&offset=${articlePage}`).then((resp) => {
			setBlogs(resp.data.articles);
			console.log(resp.data);
			dispatch(setArticlesCount(resp.data.articlesCount));
			console.log('aasasas')
		});
	}, []);

	React.useEffect(() => {
		if (start !== true) {
			axios.get(rootUrl + `/articles?limit=5&offset=${articlePage}`).then((resp) => {
				navigate(`/articles/?offset=${articlePage}`);
				setBlogs(resp.data.articles);
				dispatch(setArticlesCount(resp.data.articlesCount));
			});
		}
		setStart(false);
	}, [articlePage]);

	const post = blogs.map((p, i) => {
		const { slug, title, createdAt, description, body, tagList, author } = p;

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
