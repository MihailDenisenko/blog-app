import React from 'react'
import styles from './NavigationPanel.module.scss';
import userLogo from '../../assets/image/imgeMale.png'
import logoRW from '../../assets/image/RW.png';
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
        RealWorld Blog
      </div>
      <div className={styles.panel__right}>
        <div className={styles.panel__createArticle}>
          {isLogined ? <Link className={`${styles.panel__a} ${styles.create}`}>Create article</Link> : ''}
        </div>

        <div className={styles.panel__userName}>My name is</div>
        <div className={styles.panel__userLogo}>
          <img className={styles.panel__img} onClick={() => dispatch(setIsLogined())} src={userLogo} alt='logo' />
        </div>
        <div className={styles.panel__LogOut}>
          <Link onClick={() => dispatch(setLogOut())} className={`${styles.panel__a}  ${styles.logOut}`}>
            LogOut
          </Link>
        </div>
      </div>
    </div>
  )
}
