/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post'
import styles from './Posts.module.scss'

export default function Posts() {
  const { rootUrl } = useSelector((state) => state.newCount)
  const dispatch = useDispatch()
  const [blogs, setBlogs] = React.useState([])


  const url = 'https://blog-platform.kata.academy/api'

  React.useEffect(() => {
    axios.get(rootUrl + '/articles').then((resp) => {
      setBlogs(resp.data.articles)
    
    })
  }, [])

  const post = blogs.map((p, i) => {
    const { slug, title, createdAt, description, body, tagList, author } = p

    return (
      <li key={i + 1}>
        <Post
          slug={slug}
          title={title}
          createdAt={createdAt}
          description={description}
          body={body}
          tagList={tagList}
          author={author}
        />
      </li>
    )
  })

  return (
    <div>
      <ul className={styles.ul}>{post}</ul>
    </div>
  )
}
