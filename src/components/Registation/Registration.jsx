import React from 'react';
import styles from './Registration.module.scss';
import { useForm } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined, CloseOutlined } from '@ant-design/icons';

export default function Registration() {
	const [passVisible, setPassVisible] = React.useState(false);
	const [firstName, setFirstName] = React.useState('');
	const [firstPass, setFirstPass] = React.useState('');
	const [secondPass, setSecondPass] = React.useState('');
	const [email, setEmail] = React.useState('');

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
		console.log(data);
		setTimeout(() => reset(), 500);
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
					{errors?.firstName && (
						<p style={{ marginTop: '-20px', marginBottom: '0', marginLeft: '105px' }}>
							{errors.firstName?.message || 'Errors'}
						</p>
					)}
				</div>
				{!passVisible ? (
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
				<label>
					Ваш e-mail *
					<input
						type='email'
						placeholder='Введите e-mail'
						{...register('mail', { required: true })}
						aria-invalid={errors.mail ? 'true' : 'false'}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
					/>
					{errors.mail && <p role='alert'>{errors.mail.message}</p>}
				</label>
				<div style={{ color: 'red' }}>
					{errors?.firstName && (
						<p style={{ marginTop: '-30px', marginBottom: '0', marginLeft: '85px' }}>
							{errors.firstName?.message || 'Errors'}
						</p>
					)}
				</div>

				<label>
					Ваш пол
					<select {...register('gender')} style={{ width: '150px' }}>
						<option value='female'>female</option>
						<option value='male'>male</option>
					</select>
				</label>
				<label >* - поле обязательно	к заполнению</label>
				<input type='submit' className={styles.submit} />
			</form>
		</div>
	);
}
