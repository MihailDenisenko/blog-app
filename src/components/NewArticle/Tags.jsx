/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTagsOfArticles, deleteTag } from '../../redux/slice/articles';
import styles from './Tag.module.scss';

export default function Tags({ removeTag, index, editTags, text }) {
	const [textVal, setTextVal] = React.useState('');

	const { tags } = useSelector((state) => state.articles);
	const dispatch = useDispatch();

	return (
		<div style={{ position: 'relative' }}>
			<div
				style={{ left: '-500px', display: 'block', justifySelf: 'start', alignSelf: 'start' }}
				className={styles.div}
			>
				<input
					onChange={(e) => {
						dispatch(setTagsOfArticles([index, e.target.value]));
					}}
					value={tags[index]}
					type='text'
					style={{ width: '200px' }}
				/>
				<button
					className={styles.delete}
					onClick={(e) => {
						dispatch(deleteTag(index));
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
}

// editTags(e.target.value, index);
