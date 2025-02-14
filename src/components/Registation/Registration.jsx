/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './Registration.module.scss';
import { useForm } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined, CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { setUserData } from '../../redux/slice/logined';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
	const [passVisible, setPassVisible] = React.useState(false);
	const [firstName, setFirstName] = React.useState('');
	const [firstPass, setFirstPass] = React.useState('');
	const [secondPass, setSecondPass] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [check, setCheck] = React.useState(true);
	const { rootUrl } = useSelector((state) => state.newCount);
	const [modal, setModal] = React.useState(false);
	const [modalText, setModalText] = React.useState('true');
	const navigate = useNavigate()
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		// mode: 'onTouched',
		defaultValues: {},
	});

	const onSubmit = (data) => {
		const { firstName: username, firstPass: password, mail: email } = data;

		fetch(`${rootUrl}/users/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: { username, email, password } }),
		})
			.then((resp) => resp.json())
			.then((json) => {
				if (json?.user) {
					const { email, token, username } = json.user;
					localStorage.setItem('jwt', token);
					dispatch(setUserData(json.user));
				}
				if (json.errors.username === 'is already taken.' && json.errors.email === 'is already taken.') {
					setModalText('Эти имя и email заняты!');
					setModal(true);
				} else if (json.errors.username === 'is already taken.') {
					setModalText('К сожалению имя занято!');
					setModal(true);
				} else if (json.errors.email === 'is already taken.') {
					setModalText('К сожалению email занят!');
					setModal(true);
				}
			})
			.catch((err) => {
			});
		navigate('/articles')
		setTimeout(() => {
			setFirstName('');
			setFirstPass('');
			setSecondPass('');
			setEmail('');
		}, 300);
	};

	return (
		<div className={styles.signUpBlock}>
			<h3>Регистрация аккаунта</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Введите имя *
					<input
						placeholder='Введите имя'
						{...register('firstName', {
							required: 'Поле обязательно для ввода',
							minLength: {
								value: 3,
								message: 'Минимум 5 символов',
							},
							maxLength: {
								value: 20,
								message: 'Максимум 20 символов',
							},
						})}
						onChange={(e) => setFirstName(e.target.value)}
						value={firstName}
					/>
					{firstName !== '' ? (
						<CloseOutlined
							onClick={() => setFirstName('')}
							style={{ top: '21px', right: '18px', position: 'absolute' }}
						/>
					) : (
						''
					)}
				</label>
				<div style={{ color: 'red' }}>
					{errors?.firstName && (
						<p style={{ marginTop: '-20px', marginBottom: '0', marginLeft: '105px' }}>
							{errors.firstName?.message || 'Errors'}
						</p>
					)}
				</div>

				<label>
					Введите пароль *
					{!passVisible ? (
						<>
							<input
								type='password'
								placeholder='Введите пароль'
								{...register('firstPass', {
									required: 'Поле обязательно для ввода',
									minLength: {
										value: 6,
										message: 'Минимум 6 символов',
									},
									maxLength: {
										value: 40,
										message: 'Максимум 40 символов',
									},
								})}
								onChange={(e) => {
									setFirstPass(e.target.value);
								}}
								value={firstPass}
							/>
							<EyeOutlined onClick={() => setPassVisible(true)} className={styles.eye} />
						</>
					) : (
						<>
							<input
								placeholder='Введите пароль'
								{...register('firstPass', {
									required: 'Поле обязательно для ввода',
									minLength: {
										value: 6,
										message: 'Минимум 6 символов',
									},
									maxLength: {
										value: 40,
										message: 'Максимум 40 символов',
									},
								})}
								onChange={(e) => setFirstPass(e.target.value)}
								value={firstPass}
							/>
							<EyeInvisibleOutlined onClick={() => setPassVisible(false)} className={styles.eye} />
						</>
					)}
				</label>
				<div style={{ color: 'red' }}>
					{errors?.firstPass && (
						<p style={{ marginTop: '-20px', marginBottom: '0', marginLeft: '105px' }}>
							{errors.firstPass?.message || 'Errors'}
						</p>
					)}
				</div>
				{!passVisible ? (
					// Повтор пароля
					<label>
						Повтор пароля *
						<input
							type='password'
							placeholder='Повтор пароля'
							{...register('secondPass', {
								required: 'Поле обязательно для ввода',
								minLength: {
									value: 6,
									message: 'Минимум 6 символов',
								},
							})}
							onChange={(e) => setSecondPass(e.target.value)}
							value={secondPass}
						/>
						{secondPass !== firstPass ? (
							<div style={{ color: 'red', marginTop: '-20px', marginBottom: '0', marginLeft: '145px' }}>
								Пароли не совпадают{' '}
							</div>
						) : (
							''
						)}
					</label>
				) : (
					''
				)}
				{/* Email */}
				<label>
					Ваш e-mail *
					<input
						type='email'
						placeholder='Введите e-mail'
						{...register('mail', { required: 'Укажите валидный email' })}
						aria-invalid={errors.mail ? 'true' : 'false'}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
					/>
					{/* {errors.mail && <p role='alert'>{errors.mail.message}</p>} */}
				</label>
				<div style={{ color: 'red' }}>
					{errors?.mail && (
						<p style={{ marginTop: '-18px', marginBottom: '0', marginLeft: '105px' }}>
							{errors.mail?.message || 'Errors'}
						</p>
					)}
				</div>

				<label>
					Согласен на с условиями
					<input
						type='checkbox'
						checked={check}
						{...register('checkbox', { required: true })}
						className={!check ? styles.checkError : ''}
						onChange={() => setCheck(!check)}
					/>
					{!check ? <p style={{ color: 'orange', marginTop: '-15px' }}>Не забудьте согласться с условиями</p> : ''}
					{errors?.checkbox && <p style={{ color: 'red', marginTop: '-20px' }}>Необходимо ваше соглашение</p>}
				</label>
				<label>* - поле обязательно к заполнению</label>
				<input type='submit' className={styles.submit} />
			</form>
			<Modal
				className={styles.reactModal}
				title={modalText}
				open={modal}
				footer={false}
				onCancel={() => setModal(false)}
			/>
		</div>
	);
}
