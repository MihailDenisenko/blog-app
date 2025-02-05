/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card } from 'antd'
import React from 'react'
import styles from './Post.module.scss'
import logoOut from '../../assets/image/imgeMale.png'
import heart from '../../assets/image/heartLike.png'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';




export default function Post({ slug, title, createdAt, description, body, tagList, author }) {
  const { image, username } = author
  const [heartOn, setHeartOn] = React.useState(false)
  const [isLoged, setIsLoget] = React.useState(false)
  const { isLogined } = useSelector((state) => state.isLogined)

  const naigate = useNavigate()

  


  const tag = tagList.map((_tag, i) => {
    // console.log(_tag)
    return (
      <li className={styles.li} key={i}>
        {_tag}
      </li>
    )
  })

  


  return (
    <div className={styles.div}>
      <Card
        onClick={() => {
          naigate(`${slug}`)
          console.log(title)
        }}
        className={styles.card}
      >
        <div className={styles.leftSize}>
          <div className={styles.title}>
            <div className={styles.title__text}>{title}</div>
            <div className={styles.title__like}>
              {!isLogined ? (
                <HeartOutlined className={styles.title__likes_notActive} />
              ) : !heartOn ? (
                <HeartOutlined onClick={() => setHeartOn(!heartOn)} className={`${styles.title__likes}`} />
              ) : (
                <HeartFilled className={styles.title__likes_active} onClick={() => setHeartOn(!heartOn)} />
              )}
            </div>
          </div>

          <div className={styles.tags}>
            <ul className={styles.tags__ul}>{tag}</ul>
          </div>
          <div className={styles.body}>{body}</div>
        </div>
        <div className={styles.rightSize}>
          <div className={styles.rightSize__author}>{username}</div>
          <div className={styles.rightSize__date}>{format(createdAt, 'ii/LLL/yyy')}</div>

          <div className={styles.rightSize__logo}>
            <img className={styles.rightSize__logo} src={image} alt={username} />
          </div>
          <div className={styles.rightSize__date}></div>
        </div>
      </Card>
    </div>
  )
}
