/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './NoLogined.module.scss';
import { Link } from 'react-router-dom';

export default function NoLogined() {
	return (
		<div className={styles.noLoginedDiv}>
			<h3 className={styles.noLoginedDiv__h3}>Пожалуйта попробуйте залогиниться</h3>
			<div className={styles.links}>
				<Link className={styles.links__link} to='/signin'>
					Залогиниться
				</Link>
				<Link className={styles.links__link} to='/signup'>
					Зарегестрироваться
				</Link>
			</div>
		</div>
	);
}
