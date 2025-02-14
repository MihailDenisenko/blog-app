import React from 'react';
import styles from './ArticleEdit.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addTag, resetTags, setTags } from '../../redux/slice/articles';
import axios from 'axios';
import Tags from './Tags';

export default function ArticleEdit() {
	const { userToken } = useSelector((state) => state.isLogined);
	const { rootUrl } = useSelector((state) => state.newCount);
	const [title, setTitle] = React.useState('');
	const [text, setText] = React.useState('');
	const [short, setShort] = React.useState('');
	const { tags } = useSelector((state) => state.articles);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [articleData, setArticleData] = React.useState({});
	const [errTitle, setErrTitle] = React.useState(false);
	const [errShort, setErrShort] = React.useState(false);
	const [errText, setErrText] = React.useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm();

	const articleSlug = useParams().slug;

	React.useEffect(() => {
		axios.get(`${rootUrl}/articles/${articleSlug}`).then((resp) => {
			const postData = resp.data.article;
			setTitle(postData.title);
			setText(postData.body);
			dispatch(setTags(postData.tagList));
			setShort(postData.description);
		});
	}, []);

	const removeTag = (tagRem) => {
		let tagRemove = tags.filter((t, i) => i !== tagRem);
		setTags(tagRemove);
	};

	const editTags = (text, ind) => {
		let newTags = tags;
		newTags[ind] = text;
		// setTags(newTags)
	};

	const tag = tags.map((t, i) => {
		return (
			<div key={i}>
				<Tags removeTag={removeTag} index={i} editTags={editTags} text={tags} />
			</div>
		);
	});

  async function onSubmit(data) {
    
    
		const token = localStorage.getItem('jwt');
		const articlec = {};
    

    if ((tags.length > 1 && tags.length !== 0) || tags[0] !== '') articlec.tags = tags;
		const description = short;
		const body = text;
		if (description === '') setErrShort(true);
		if (title === '') setErrTitle(true);
		if (body === '') setErrText(true);
		if (description !== '' && body !== '' && title !== '') {
			await fetch(`${rootUrl}/articles/${articleSlug}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ article: { tagList: tags, body, title, description } }),
			})
				.then((resp) => resp.json())
				.then((json) => {
					dispatch(resetTags());
					navigate('/articles/');
				})
				.catch((e) => console.log(e));
		}
	}

	return (
		<div className={styles.createArticle}>
			<p className={styles.p}>Редактирование статьи</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* Заголовок */}
				<label>
					Заголовок *
					<input
						autoFocus
						// {...register('title')}
						type='text'
						placeholder='Укажите заголовок'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
					{errTitle && <p className={styles.p_err}>{'Текст заголовка Обязателен'}</p>}
				</label>
				{/* Описание */}
				<label>
					Описание *
					<input
						autoFocus
						{...register('shortDescription')}
						type='text'
						placeholder='Укажите заголовок'
						onChange={(e) => setShort(e.target.value)}
						value={short}
					/>
					{errShort && <p className={styles.p_err}>{'Описание обязательно'}</p>}
				</label>
				{/* Текст */}
				<label>
					Текст *
					<textarea
						autoFocus
						placeholder='Укажите Текст для вашего блога в формате Markdown'
						{...register('text')}
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					{errText && <p className={styles.p_err}>{'Текст обязятелен'}</p>}
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
						<div
							className={styles.addBton}
							type='primary'
							style={{ marginBottom: '55px', position: 'relative' }}
							onClick={() => {
								dispatch(addTag());
							}}
						>
							Add
						</div>
					</div>
				</div>
				<div style={{ position: 'absolute', bottom: '10px', left: '25px' }}>
					<input type='submit' style={{ height: '35px', width: '150px', justifySelf: 'self-start' }} />
				</div>
			</form>
		</div>
	);
}
