import React from 'react'
import styles from './HomePage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'


export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className={styles.HomePage}>
      <div className={styles.HomePage__posts}>
        <Button className={styles.HomePage__btn} onClick={() => navigate('/articles')} >
          Посмотреть посты
        </Button>
      </div>
      <div className={styles.HomePage__toLogin}>
        <Button className={styles.HomePage__btn}>Залогиниться</Button>
      </div>
    </div>
  )
}

// onClick={() => {
//   navigate('/articles')
// }}
