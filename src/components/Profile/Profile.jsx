/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './Profile.module.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData, setUserImage } from '../../redux/slice/logined';

export default function Profile() {
	const [firstName, setFirstName] = React.useState('');

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [passwordShow, setPasswordShow] = React.useState(true);
	const [avatarUrl, setAvatarUrl] = React.useState('');

	const [errorAvatar, setErrorAvatar] = React.useState(false);
	const [firstNameError, setFirstNameError] = React.useState(false);
	const [errEmail, setErrEmail] = React.useState('');

	const { rootUrl } = useSelector((state) => state.newCount);
	const { userToken } = useSelector((state) => state.isLogined);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data)
		const { username, password, email, avatar } = data;
		const user = {};
		if (!/^(http||https)?:[//]/.test(avatar) && avatar !== '') {
			setErrorAvatar(true);
			return;
		}
		if (data.username !== '') user.username = username;
		if (data.email !== '') user.email = email;
		if (data.password !== '') user.password = password;
		if (/^(http||https)?:[//]/.test(avatar)) user.image = avatar;

		axios
			.put(
				`${rootUrl}/user`,
				{ user },
				{
					headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
				},
			)
			.then((resp) => {
				const { data } = resp;
				console.log(data)
				dispatch(setUserData(data.user));
				setTimeout(() => {
					setFirstName('');
					setEmail('');
					setPassword('');
					setAvatarUrl('');
					setFirstNameError(false);
				}, 300);
				navigate('/articles');
			})
			.catch((er) => {
				const errors = er.response.data.errors;
				if (errors.username === 'is already taken.') setFirstNameError(true);
				if (errors.email === 'is invalid') setErrEmail(true);
			});
	};

	return (
		<div className={styles.profilePage}>
			<div className={styles.profile}>
				<h3 className={styles.profile__title}>Редактирование профиля</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Имя */}
					<label>
						Имя
						<input
							{...register('username', {
								minLength: {
									value: 3,
									message: 'Минимум 3 символa',
								},
								maxLength: {
									value: 20,
									message: 'Максимум 20 символов',
								},
							})}
							placeholder='Введите имя'
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						/>
						{firstName !== '' ? <CloseOutlined onClick={() => setFirstName('')} className={styles.closed} /> : ''}
						{errors?.firstName && (
							<p style={{ marginTop: '-10px', marginBottom: '-5px', color: 'red' }}>{errors.firstName?.message}</p>
						)}
						{firstNameError && (
							<p style={{ marginTop: '-10px', marginBottom: '-5px', color: 'red' }}>{'Это имя уже занято'}</p>
						)}
					</label>

					{/* email */}
					<label>
						Ваш e-mail
						<input
							type='email'
							{...register('email', {})}
							placeholder='Ваш e-mail'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
						{email !== '' ? <CloseOutlined onClick={() => setEmail('')} className={styles.closed} /> : ''}
						{errEmail && (
							<p style={{ marginTop: '-10px', marginBottom: '-5px', color: 'red' }}>{'Этот email уже занят'}</p>
						)}
					</label>
					{/* пароль */}
					<label>
						Новый пароль
						{!passwordShow ? (
							<input
								className={styles.pass}
								type='password'
								{...register('password', {
									minLength: {
										value: 6,
										message: 'Минимум 6 символов',
									},
									maxLength: 40,
									message: 'Максимум 40 символов',
								})}
								onChange={(pas) => setPassword(pas.target.value)}
								placeholder='Укажите пароль'
								value={password}
							/>
						) : (
							<input
								className={styles.pass}
								{...register('password', {
									// required: 'Обязательное поле',
									minLength: {
										value: 6,
										message: 'Минимум 6 символов',
									},
									maxLength: 40,
									message: 'Максимум 40 символов',
								})}
								onChange={(pas) => setPassword(pas.target.value)}
								value={password}
								placeholder='Укажите пароль'
							/>
						)}
						{!passwordShow ? (
							<EyeOutlined onClick={() => setPasswordShow(true)} className={styles.eye} />
						) : (
							<EyeInvisibleOutlined className={styles.eye} onClick={() => setPasswordShow(false)} />
						)}
						{errors?.password && (
							<p style={{ marginTop: '-10px', marginBottom: '-5px', color: 'red' }}>{errors.password?.message}</p>
						)}
					</label>
					{/* Avatar(URL) */}
					<label>
						Аватар (URL)
						<input
							{...register('avatar')}
							placeholder='Введите URL'
							onChange={(e) => setAvatarUrl(e.target.value)}
							value={avatarUrl}
							style={{ paddingRight: '25px' }}
						/>
						{avatarUrl !== '' ? <CloseOutlined onClick={() => setAvatarUrl('')} className={styles.closed} /> : ''}
						{errorAvatar && <p style={{ color: 'red', marginTop: '-10px' }}>Вводимое не является адресом</p>}
					</label>
					<input type='submit' className={styles.submit} value={'Сохранить'} />
				</form>
			</div>
		</div>
	);
}
