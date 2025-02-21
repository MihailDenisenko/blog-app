/* eslint-disable react/prop-types */
import React from 'react';
import styles from './Author.module.scss';
import { format } from 'date-fns';
import LogoErr from '../../../assets/image/imgeMale.png';

export default function Author({ author, created }) {
	const { image, username } = author;

	const [errorArticle, setErrorArticle] = React.useState(false);

	React.useEffect(() => {}, []);

	return (
		<div className={styles.authorAll}>
			<div className={styles.authorAll__userName}>{username}</div>
			{created !== '' ? <div className={styles.authorAll__create}>{format(created, 'ii LLL yyy')}</div> : ''}
			<div className={styles.authorAll__image}>
				<img
					className={styles.authorAll__image_img}
					src={!errorArticle ? image : LogoErr}
					alt=''
					onError={() => setErrorArticle(true)}
				/>
			</div>
		</div>
	);
}
