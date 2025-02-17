/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setIsLogined } from '../../redux/slice/logined';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';

const App = () => {
	const { rootUrl } = useSelector((state) => state.newCount);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [checked, setChecked] = React.useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onFinish = (values) => {
		const { password, email } = values;
		fetch(`${rootUrl}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: { password, email } }),
		})
			.then((resp) => resp.json())
			.then((json) => {
				if (json?.errors) {
					const { errors } = json;
					setIsModalOpen(true);
				} else {
					localStorage.setItem('jwt', json.user.token);
					dispatch(setUserData(json.user));
					navigate('/articles');
				}
			});
	};
	const onFinishFailed = (errorInfo) => {
		setIsModalOpen(true);
	};

	return (
		<>
			<Form
				name='basic'
				labelCol={{
					span: 6,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 600,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
			>
				<Form.Item
					label='email'
					name='email'
					rules={[
						{
							required: true,
							message: 'Введите ваш email!',
						},
					]}
				>
					<Input placeholder='Введите ваш email!' />
				</Form.Item>

				<Form.Item
					label='Пароль'
					name='password'
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите ваш пароль!',
						},
					]}
				>
					<Input.Password placeholder='Пожалуйста введите ваш пароль' />
				</Form.Item>

				<Form.Item name='remember' valuePropName='checked' label={null}>
					<Checkbox onChange={(e) => setChecked(e.target.checked)} checked={checked}>
						Запомнить меня
					</Checkbox>
				</Form.Item>

				<Form.Item label={null}>
					<Button type='primary' htmlType='submit'>
						Лoгинься
					</Button>
				</Form.Item>
			</Form>
			<Modal
				title='Попробуйте ввести корректные данные'
				open={isModalOpen}
				footer={false}
				closable={false}
				maskClosable={true}
				mask={true}
				onCancel={() => setIsModalOpen(false)}
				onOk={() => setIsModalOpen(false)}
				className={styles.modal}
				titleColor={'rgba(205, 30, 30, 0.88)'}
			>
				{/* <p>Извините, но попробуйте ввести корректные данные</p> */}
			</Modal>
			<p>
				нет аккаунта? <Link to='/signup'>Регистрируйся</Link>
			</p>
		</>
	);
};
export default App;
