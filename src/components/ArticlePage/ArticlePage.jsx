import React from 'react'
import styles from './ArticlePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


export default function ArticlePage() {

  const { article } = useSelector((state) => state.articles)
  const { rootUrl } = useSelector((state) => state.newCount)

  const dispatch = useDispatch()
  
  React.useEffect(() => { 
    axios.get(rootUrl + `/articles/${article}`).then((resp) => {
      console.log(resp.data.article)
    })
  },[])


  return (
    <div className={styles.ArticlePage}>
      
    </div>
  )
}
