/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Author.module.scss';
import { format } from 'date-fns';


export default function Author({ author, created }) {
	const { image, username } = author;

  created === '' ? console.log('created') : console.log(created);
	// console.log(format(created, 'ii LLL yyy'))
	return (
		<div className={styles.authorAll}>
			<div className={styles.authorAll__userName}>{username}</div>
			{created !== '' ? <div className={styles.authorAll__create}>{format(created, 'ii LLL yyy')}</div> : ''}
			<div className={styles.authorAll__image}>
				<img className={styles.authorAll__image_img} src={image} alt='' />
			</div>
		</div>
	);
}
