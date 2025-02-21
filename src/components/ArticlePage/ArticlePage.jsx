/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styles from './ArticlePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setArticle } from '../../redux/slice/articles';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import Markdown from 'react-markdown';
import Discr from './atributes/Discr';
import Body from './atributes/Body';
import Author from './atributes/Author';
import { Modal } from 'antd';
import { toFavorite } from '../Favorites/Favorite';

export default function ArticlePage() {
	const { isLogined, userToken, userNickName } = useSelector((state) => state.isLogined);
	const { article } = useSelector((state) => state.articles);
	const { rootUrl } = useSelector((state) => state.newCount);
	const [heartOn, setHeartOn] = React.useState(false);
	const [title, setTitle] = React.useState('');
	const [tags, setTags] = React.useState([]);
	const [description, setDescription] = React.useState('');
	const [body, setBody] = React.useState('');
	const [createdAt, setCreatedAt] = React.useState('');
	const [favoritesCount, setFavoritesCount] = React.useState(0);
	const [author, setAuthor] = React.useState({});
	// const [following, setFollowing] = React.useState('');
	const [isEditor, setIsEditor] = React.useState(false);
	const [modalShow, setModalShow] = React.useState(false);
	const [slug, setSlug] = React.useState('');
	const [errorArticle, setErrorArticle] = React.useState(false);

	const [onFavor, setOnFavor] = React.useState(false);

	const params = useLocation();
	const dispatch = useDispatch();

	article === null ? dispatch(setArticle(params.pathname.replace('articles/', ''))) : '';

	const navigate = useNavigate();

	async function toFavor(obj) {
		// console.log(obj);

		const a = await toFavorite(obj);
		if (a.favorite === 'adding') {
			setFavoritesCount(favoritesCount + 1);
			setOnFavor(true);
		}
		if (a.favorite === 'delete') {
			setFavoritesCount(favoritesCount - 1);
			setOnFavor(false);
		}
		setHeartOn(!heartOn);
	}

	React.useEffect(() => {
		const token = localStorage.getItem('jwt');
		article !== null
			? axios
					.get(rootUrl + `/articles/${article}`, {
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
					})
					.then((resp) => {
						const nickName = resp.data.article.author.username;
						if (nickName === userNickName) {
							setIsEditor(true);
						}
						const { title, tagList, description, body, createdAt, favoritesCount, author, favorited, slug } =
							resp.data.article;
						// const { following } = author;
						// setFollowing(following);
						setTitle(title);
						if (tagList.length !== 0 && !tagList.includes('')) {
							setTags(tagList);
						}
						setDescription(description);
						setBody(body);
						setCreatedAt(createdAt);
						setFavoritesCount(favoritesCount);
						setAuthor(author);
						setOnFavor(favorited);
						setSlug(slug);
					})
					.catch((e) => setErrorArticle(true))
			: '';
	}, [article, userNickName]);

	// React.useEffect(() => { setOnFavor(favorited) },[favorited])

	const tag = tags.map((t, i) => {
		return (
			<li className={styles.li} key={i}>
				{t}
			</li>
		);
	});

	async function deletPost() {
		await fetch(`${rootUrl}/articles/${article.replace('/', '')}/`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${userToken}`,
				'Content-Type': 'application/json',
			},
		})
			.then((resp) => {
				navigate('/articles');
				return resp.json();
			})
			.then((json) => {
				json;
			})
			.catch((e) => console.log(e));
	}

	return !errorArticle ? (
		<div className={styles.ArticlePage}>
			<div className={styles.card}>
				<div className={styles.card__title}>
					<div className={styles.card__title_text}>
						<Markdown>{title}</Markdown>
					</div>
					<div className={styles.likes}>
						{!isLogined ? (
							<HeartOutlined className={styles.title__likes_notActive} />
						) : !onFavor ? (
							<HeartOutlined
								onClick={() => {
									toFavor({ slug, onFavor, favoritesCount });
								}}
								className={`${styles.title__likes}`}
							/>
						) : (
							<HeartFilled
								className={styles.title__likes_active}
								onClick={() => toFavor({ slug, onFavor, favoritesCount })}
							/>
						)}
						<div className={styles.title__likes_favorites}>{favoritesCount}</div>
					</div>
				</div>

				{tags.length !== 0 ? (
					<div className={styles.card__tags}>
						<ul className={styles.ul}>{tag}</ul>
					</div>
				) : (
					''
				)}
				<div className={styles.card__discription}>
					<Discr description={description} />
				</div>
				<div className={styles.card__body}>
					<Body text={body} />
				</div>
				<div className={styles.card__author}>
					<Author author={author} created={createdAt} />
				</div>

				{isEditor ? (
					<div className={styles.btns}>
						<button onClick={() => setModalShow(true)} className={`${styles.btns__delet} ${styles.btns_btn}`}>
							Удалить пост
						</button>
						<Modal
							open={modalShow}
							onOk={() => {
								deletPost();
							}}
							onCancel={function () {
								setModalShow(false);
							}}
							destroyOnClose={true}
							title={'Вы уверены что хотите удалить этот пост?'}
						/>
						<button
							onClick={() => {
								navigate(`edit/`);
							}}
							className={`${styles.btns__edit} ${styles.btns_btn}`}
						>
							Редактировать Пост
						</button>
					</div>
				) : (
					''
				)}
			</div>
		</div>
	) : (
		<div style={{ textAlign: 'center', marginTop: '45px', color: 'brown' }}>
			<h2>К сожалению по этому запросу ничего нет</h2>

			<h2 style={{ marginTop: '50px' }}>Попробуйте сделать другой запрос</h2>
			<h2 style={{ marginTop: '50px' }}>
				или нажмите <Link to='/articles/'>сюда</Link>
			</h2>
		</div>
	);
}
