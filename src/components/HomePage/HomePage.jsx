import React from 'react';
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setLogOut } from '../../redux/slice/logined';

export default function HomePage() {
	React.useEffect(() => {}, []);
	const navigate = useNavigate();
	const { isLogined } = useSelector((state) => state.isLogined);
	const dispatch = useDispatch();

	return (
		<div className={styles.HomePage}>
			<div className={styles.HomePage__posts}>
				<Button className={styles.HomePage__btn} onClick={() => {
					if (localStorage.getItem('page')!==null) localStorage.setItem('page', 1) 
					navigate('/articles/')
				}}>
					Посмотреть посты
				</Button>
			</div>
			<div className={styles.HomePage__posts}></div>
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
