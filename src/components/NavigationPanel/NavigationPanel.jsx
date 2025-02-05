import React from 'react'
import styles from './NavigationPanel.module.scss';
import userLogo  from '../../assets/image/imgeMale.png'
import { Link } from 'react-router-dom';
import { setLogOut, setIsLogined } from '../../redux/slice/logined';
import { useDispatch } from 'react-redux';


export default function NavigationPanel() {

  const dispatch = useDispatch()


  return (
    <div className={styles.panel}>
      <div className={styles.panel__title}>RealWorld Blog</div>
      <div className={styles.panel__right}>
        <div className={styles.panel__createArticle}>
          <Link className={`${styles.panel__a} ${styles.create}`} to='/'>
            Create article
          </Link>
        </div>

        <div className={styles.panel__userName}>My name is</div>
        <div className={styles.panel__userLogo}>
          <img className={styles.panel__img} onClick={() => dispatch(setIsLogined())} src={userLogo} alt='logo' />
        </div>
        <div className={styles.panel__LogOut}>
          <Link onClick={() => dispatch(setLogOut())} className={`${styles.panel__a}  ${styles.logOut}`} to='/'>
            LogOut
          </Link>
        </div>
      </div>
    </div>
  )
}
