/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card } from 'antd';
import React from 'react';
import styles from './Post.module.scss';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { setArticle } from '../../redux/slice/articles';
import Markdown from 'react-markdown';
import { toFavorite } from '../Favorites/Favorite';


export default function Post({ slug, title, createdAt, description, body, tagList, author, favoritesCount, favorited })
{
	console.log(favorited)
	const { image, username } = author;
	const [heartOn, setHeartOn] = React.useState(false);
	const [isLoged, setIsLoget] = React.useState(false);
	const { isLogined } = useSelector((state) => state.isLogined);
	const dispatch = useDispatch();
	const naigate = useNavigate();

	const tag = tagList.map((_tag, i) => {
		return (
			<li className={styles.li} key={i}>
				{_tag}
			</li>
		);
	});

	
	const goToArticle = () => {
		dispatch(setArticle(slug));
		naigate(`/articles/${slug}`);
	};

	return (
		<div className={styles.div}>
			<Card className={styles.card}  >
				<div className={styles.leftSize}>
					<div className={styles.title}>
						<div
							className={styles.title__text}
							onClick={() => {
								goToArticle();
							}}
						>
							{title}
						</div>
						<div style={{position:'relative'}} className={styles.title__like}>
							{!isLogined ? (
								<HeartOutlined  className={styles.title__likes_notActive} />
							) : !favorited ? (
								<HeartOutlined onClick={() => {toFavorite(slug, favorited)}} className={`${styles.title__likes}`} />
							) : (
								<HeartFilled className={styles.title__likes_active} onClick={() => {toFavorite(slug, favorited)}} />
							)}
							<div style={{ position: 'absolute', left: "25px", top: '-1px' }}
								className={isLogined?styles.fovorLog:styles.noFavorLog}
							>{favoritesCount}</div>
						</div>
					</div>

					<div
						className={styles.tags}
						onClick={() => {
							goToArticle();
						}}
					>
						<ul className={styles.tags__ul}>{tag}</ul>
					</div>
					<div className={styles.body}>
						<Markdown>{body}</Markdown>
					</div>
				</div>
				<div
					className={styles.rightSize}
					onClick={() => {
						goToArticle();
					}}
				>
					<div className={styles.rightSize__author}>{username}</div>
					<div className={styles.rightSize__date}>{format(createdAt, 'ii LLL yyy')}</div>

					<div className={styles.rightSize__logo}>
						<img className={styles.rightSize__logo} src={image} alt={username} />
					</div>
					<div className={styles.rightSize__date}></div>
				</div>
			</Card>
		</div>
	);
}
