import React from 'react'
import styles from './NavigationPanel.module.scss';
import userLogo from '../../assets/image/imgeMale.png'
import logoRW from '../../assets/image/RW.png';
import petrFirst from '../../assets/image/petrFirst.jpeg'
import { Link, useNavigate } from 'react-router-dom';
import { setLogOut, setIsLogined } from '../../redux/slice/logined';
import { useDispatch, useSelector } from 'react-redux';


export default function NavigationPanel() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
    const { isLogined } = useSelector((state) => state.isLogined)
  


  return (
		<div className={styles.panel}>
			<div className={styles.panel__title} onClick={() => navigate('/')}>
				<img className={styles.panel__title_img} src={logoRW} alt='RealWorld Blog' />
				Блог реального мира
			</div>
			<div className={styles.panel__right}>
				<div className={styles.panel__createArticle}>
					{isLogined ? (
						<Link to='/new-article' className={`${styles.panel__a} ${styles.create}`}>
							Написать статью
						</Link>
					) : (
						''
					)}
				</div>

				<div
					className={styles.panel__userName}
					onClick={() => {
						isLogined ? navigate('/profile') : navigate('/signin');
					}}
				>
					{!isLogined ? `Зарегестрируйтесь или войдите` : 'Михаил'}
				</div>
				<div className={styles.panel__userLogo}>
					<img
						className={styles.panel__img}
						onClick={() => (isLogined ? navigate('/profile') : navigate('/signin'))}
						src={isLogined ? petrFirst : userLogo}
						alt='logo'
					/>
				</div>
				<div className={styles.panel__LogOut}>
					{isLogined ? (
						<Link to='/' onClick={() => {
							dispatch(setLogOut());
							localStorage.clear()
						}} className={`${styles.panel__a}  ${styles.logOut}`}>
							Выход
						</Link>
					) : (
						<Link to={'/signin'} className={`${styles.panel__a}  ${styles.logOut}`}>
							Вход
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
