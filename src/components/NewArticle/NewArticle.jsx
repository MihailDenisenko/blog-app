import React from 'react';
import styles from './NewArticle.module.scss';
import { useForm } from 'react-hook-form';
import slug from 'limax';
useSelector;
import Tags from './Tags';
import { useSelector, useDispatch } from 'react-redux';
import { addTag, resetTags } from '../../redux/slice/articles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import js from '@eslint/js';


export default function NewArticle() {
	const {  userToken } = useSelector(state => state.isLogined)
	const { rootUrl } = useSelector((state) => state.newCount);
	
	const [title, setTitle] = React.useState('');
	const [short, setShort] = React.useState('');
	const [tagsNum, setTagsNum] = React.useState(1);
	const slugi = slug(title, { delimiter: '-' });
	const { tags } = useSelector((state) => state.articles);
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm();

	const removeTag = (tagRem) => {
		console.log(tagRem);
		let tagRemove = tags.filter((t, i) => i !== tagRem);
		console.log(tagRemove);
		// setTags(tagRemove)
	};

	const editTags = (text, ind) => {
		// console.log(text, ind)
		let newTags = tags;
		newTags[ind] = text;
		console.log(newTags);
		// setTags(newTags)
	};

	const onSubmit = (data) => {

		const token = localStorage.getItem('jwt')
		const articlec = {}
		const { title, shortDescription, text } = data;
		// articlec.slugi = slug;
		if (tags.length > 1 && tags.length !== 0 || tags[0] !== '') articlec.tags = tags;
		articlec.title = title
		const description = shortDescription;
		const body = text
		const slug = slugi
		
		
		
		fetch(`${rootUrl}/articles`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({article:{slugi:slug, tags, body, title}})
		}).then(resp=>resp.json()).then(json=>console.log(json));
		
		dispatch(resetTags())
		return navigate('/articles/')

	
	};

	const tag = tags.map((t, i) => {
		return (
			<div key={i}>
				<Tags removeTag={removeTag} index={i} editTags={editTags} text={tags} />
			</div>
		);
	});

	return (
		<div className={styles.createArticle}>
			<p className={styles.p}>Создание новой статьи</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				{title !== '' ? (
					<label className={styles.slug}>
						slug is:
						<span className={styles.slug__span}>{slugi}</span>
					</label>
				) : (
					''
				)}
				{/* Заголовок */}
				<label>
					Заголовок *
					<input
						{...register('title', { required: 'Заголовок Обязателен' })}
						type='text'
						placeholder='Укажите заголовок'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
					{errors?.title && <p className={styles.p_err}>{errors.title.message}</p>}
				</label>
				{/* Описание */}
				<label>
					Описание *
					<input
						{...register('shortDescription', { required: 'Описание обязательно' })}
						type='text'
						placeholder='Укажите заголовок'
						onChange={(e) => setShort(e.target.value)}
						value={short}
					/>
					{errors?.shortDescription && <p className={styles.p_err}>{errors.shortDescription.message}</p>}
				</label>
				{/* Текст */}
				<label>
					Текст *
					<textarea
						placeholder='Укажите Текст для вашего блога в формате Markdown'
						{...register('text', { required: 'Текст обязятелен' })}
					/>
					{errors?.text && <p className={styles.p_err}>{errors.text.message}</p>}
				</label>
				{/* Тэги */}
				<div className={styles.tags}>
					Тэги
					<div
						style={{
							position: 'relative',
							height: 'auto',
						}}
						className={styles.tags__visible}
					>
						<div style={{}}>{tag}</div>
						<button
							className={styles.addBton}
							type='primary'
							style={{ marginBottom: '55px', position: 'relative' }}
							onClick={() => {
								dispatch(addTag());
							}}
						>
							Add
						</button>
					</div>
				</div>
				<div style={{ position: 'absolute', bottom: '10px', left: '25px' }}>
					<input type='submit' style={{ height: '35px', width: '150px', justifySelf: 'self-start' }} />
				</div>
			</form>
		</div>
	);
}
