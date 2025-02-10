import React from 'react';
import styles from './NewArticle.module.scss';
import { useForm } from 'react-hook-form';
import slug from 'limax';
useSelector
import Tags from './Tags';
import { useSelector, useDispatch } from 'react-redux';
import { addTag } from '../../redux/slice/articles';

export default function NewArticle() {
	const [title, setTitle] = React.useState('');
	const [short, setShort] = React.useState('');
	// const [tags, setTags] = React.useState(['']);
	const [tagsNum, setTagsNum] = React.useState(1);
	const slugi = slug(title, { delimiter: '-' });
		const { tags } = useSelector((state) => state.articles);
	
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm();

  const removeTag = (tagRem) => {
    console.log(tagRem)
		let tagRemove = tags.filter((t, i) => i !== tagRem)
		console.log(tagRemove)
		// setTags(tagRemove)
		
	}
	
  const editTags = (text, ind) => {
    // console.log(text, ind)
    let newTags = tags
		newTags[ind] = text;
		console.log(newTags)
    // setTags(newTags)
  }
  

	const onSubmit = (data) => {
		data.slug = slugi;
		console.log(data);
		reset();
	};

  const tag = tags.map((t, i) => {
  
		return (  
			<div key={i}>
				<Tags removeTag={removeTag} index={i} editTags={editTags} text={tags}/>
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
					Заголовок
					<input
						{...register('title', { required: 'Укажите заголовок' })}
						type='text'
						placeholder='Укажите заголовок'
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
				</label>
				{/* Описание */}
				<label>
					Описание
					<input
						{...register('shortDescription')}
						type='text'
						placeholder='Укажите заголовок'
						onChange={(e) => setShort(e.target.value)}
						value={short}
					/>
				</label>
				{/* Текст */}
				<label>
					Текст
					<textarea placeholder='Укажите Текст для вашего блога в формате Markdown' {...register('text')} />
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
								dispatch(addTag())
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
