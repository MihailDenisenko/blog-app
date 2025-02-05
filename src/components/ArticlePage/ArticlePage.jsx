import React from 'react';
import styles from './ArticlePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { setArticle } from '../../redux/slice/articles';
 

export default function ArticlePage() {
	const { article } = useSelector((state) => state.articles);
	const { rootUrl } = useSelector((state) => state.newCount);
	const [title, setTitle] = React.useState('');
	const [tags, setTags] = React.useState([]);
  const params = useLocation()
	const dispatch = useDispatch();
  
  article===null?dispatch(setArticle(params.pathname.replace('articles/',''))):''


	React.useEffect(() => {
		axios.get(rootUrl + `/articles/${article}`).then((resp) => {
			console.log(resp.data.article);
			const { title, tagList } = resp.data.article;
			setTitle(title);
			setTags(tagList);
		});
	}, [article]);


  console.log(params.pathname.replace('articles/',''))
	const tag = tags.map((t, i) => {
		return <li className={ styles.li } key={i}>{t}</li>;
	});
	return (
		<div className={styles.ArticlePage}>
			<div className={styles.card}>
				<div className={styles.card__title}>
					<div className={ styles.card__title_text}>{title}</div>
				</div>
				<div className={styles.card__tags}>
					<ul className={ styles.ul}>{tag}</ul>
				</div>
			</div>
		</div>
	);
}
