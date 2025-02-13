/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import styles from './PaginPage.module.scss';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setArticlePage } from '../../redux/slice/articles';
import { useLocation } from 'react-router-dom';

export default function PaginPage() {
	const { articlesCount } = useSelector((state) => state.articles);
	const dispatch = useDispatch();
	const hhh = (page) => dispatch(setArticlePage(page));

	const total = articlesCount / 10;

	
	return (
		<div>
			<Pagination
				defaultCurrent={useLocation().search ? (Number(useLocation().search.replace('?offset=', ''))) : 1}
				align='center'
				total={articlesCount}
				// total={countBlogs !== 0 ? countBlogs / 20 : 20}
				className={styles.pagin}
				// responsive={false}
				showSizeChanger={false}
				onChange={hhh}
			/>
		</div>
	);
}
