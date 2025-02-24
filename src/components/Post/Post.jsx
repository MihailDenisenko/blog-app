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
import Logo from "../../assets/image/petrFirst.jpeg"

export default function Post({
	slug,
	title,
	createdAt,
	description,
	body,
	tagList,
	author,
	favoritesCount,
	favorited,
}) {
	const { image, username } = author;
	const [isLoged, setIsLoget] = React.useState(false);
	const { isLogined } = useSelector((state) => state.isLogined);
	const [countFavor, setCountFavor] = React.useState(favoritesCount);
	const [imgErr, setImgErr] = React.useState(false)

	const [favori, setFavori] = React.useState(favorited)
// console.log(favori, favorited)

	const [onFavor, setOnFavor] = React.useState(favorited);

	const dispatch = useDispatch();
	const naigate = useNavigate();

	const tag = tagList.map((_tag, i) => {
		return (
			<li className={styles.li} key={i}>
				{_tag}
			</li>
		);
	});
	

	const evTar = (evnt) => { 
		console.log(evnt)
	}

	const goToArticle = () => {
		dispatch(setArticle(slug));
		naigate(`/articles/${slug}`);
	};

	async function toFavor(obj) {
		// console.log(obj);

		const a = await toFavorite(obj);
		if (a.favorite === 'adding') {
			setCountFavor(countFavor + 1);
			setOnFavor(true);
		}
		if (a.favorite === 'delete') {
			setCountFavor(countFavor - 1);
			setOnFavor(false);
		}
	}
	React.useEffect(() => { setOnFavor(favorited) },[favorited])
	// console.log(favorited, favori)

	return (
		<div className={styles.div}>
			<Card className={styles.card}>
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
						<div style={{ position: 'relative' }} className={styles.title__like}>
							{!isLogined ? (
								<HeartOutlined className={styles.title__likes_notActive} />
							) : !onFavor ? (
								<HeartOutlined
									onClick={() => {
										toFavor({ slug, onFavor, countFavor });
									}}
									className={`${styles.title__likes}`}
								/>
							) : (
								<HeartFilled
									className={styles.title__likes_active}
									onClick={() => {
										toFavor({ slug, onFavor, countFavor });
									}}
								/>
							)}
							<div
								style={{ position: 'absolute', left: '25px', top: '-1px' }}
								className={isLogined ? styles.fovorLog : styles.noFavorLog}
							>
								{countFavor}
							</div>
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
						<img className={styles.rightSize__logo} src={!imgErr?image:Logo} onError={()=>setImgErr(true)} alt={username} />
						
					</div>
					<div className={styles.rightSize__date}></div>
				</div>
			</Card>
		</div>
	);
}
