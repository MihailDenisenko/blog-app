import React from 'react';
import styles from './PaginPage.module.scss'
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';



export default function PaginPage() {
  const { countBlogs } = useSelector((state) => state.newCount)


  return (
		<div>
			<Pagination
				defaultCurrent={1}
				align='center'
				total={countBlogs !== 0 ? countBlogs / 20 : 20}
				className={styles.pagin}
				responsive={false}
        showSizeChanger={false}
        
        onChange={(x)=>console.log(x)}
			/>
		</div>
	);
}
