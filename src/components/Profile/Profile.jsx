import React from 'react';
import styles from './Profile.module.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';


export default function Profile() {
	const [firstName, setFirstName] = React.useState('');
	const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordShow, setPasswordShow] = React.useState(true);
	const [avatarUrl, setAvatarUrl] = React.useState('');
  

  // const url = 'https://blog-platform.kata.academy//api/users';
  // React.useEffect(() => { 
  //   axios
	// 		.get(url, {
	// 			user: {
	// 				email: 'string',
	// 				password: 'string',
	// 			},
	// 		})
	// 		.then((resp) => console.log(resp));
  // },[])

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm();

	const onSubmit = (data) => {
    reset()
    console.log(data);
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
							{...register('firstName', {
								required: true,
								minLength: {
									value: 3,
									message: 'Минимум 3 символов',
								},
								maxLength: {
									value: 20,
								},
							})}
							placeholder='Введите имя'
							onChange={(e) => setFirstName(e.target.value)}
							value={firstName}
						/>
					</label>

					{/* email */}
					<label>
						Ваш e-mail
						<input
							type='email'
							{...register('email', {
								required: true,
							})}
							placeholder='Ваш e-mail'
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</label>
					{/* пароль */}
					<label>
						Новый пароль
						{!passwordShow ? (
							<input
								type='password'
								{...register('password', {
									required: true,
									minLength: {
										value: 6,
									},
									maxLength: 40,
								})}
								onChange={(pas) => setPassword(pas.target.value)}
								placeholder='Укажите пароль'
								value={password}
							/>
						) : (
							<input
								{...register('password', {
									required: true,
									minLength: {
										value: 6,
									},
									maxLength: 40,
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
					</label>
					{/* Avatar(URL) */}
					<label>
						Аватар (URL)
							<input
								{...register('avatar' )}
								placeholder='Введите URL'
								onChange={(e) => setAvatarUrl(e.target.value)}
								value={avatarUrl}
            />
          </label>
          <input type="submit" className={styles.submit} value={'Сохранить'} />
				</form>
			</div>
		</div>
	);
}
