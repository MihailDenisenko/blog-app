import React from 'react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogined, setLogOut } from '../../redux/slice/logined';

export default function HomePage() {
	const navigate = useNavigate();
	const { isLogined } = useSelector((state) => state.isLogined);
	const dispatch = useDispatch();

	return (
		<div className={styles.HomePage}>
			<div className={styles.HomePage__posts}>
				<Button className={styles.HomePage__btn} onClick={() => navigate('/articles')}>
					Посмотреть посты
				</Button>
			</div>
			<div className={styles.HomePage__posts}>
				{/* {isLogined ? (
					<Button className={styles.HomePage__btn} onClick={() => navigate('/articles')}>
						Посмотреть свои посты посты
					</Button>
				) : (
					''
				)} */}
			</div>
			<div className={styles.HomePage__toLogin}>
				{!isLogined ? (
					<Button
						onClick={() => {
							navigate('/signin');
						}}
						className={styles.HomePage__btn}
					>
						Залогиниться
					</Button>
				) : (
					<Button
						onClick={() => {
							dispatch(setLogOut());
						}}
						className={styles.HomePage__btn}
					>
						Выйти
					</Button>
				)}
			</div>
		</div>
	);
}

// onClick={() => {
//   navigate('/articles')
// }}
