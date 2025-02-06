import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/slice/logined';
import { Link, useNavigate } from 'react-router-dom';

const App = () => {
	
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onFinish = (values) => {
		if (values.username === 'mike' && values.password === '1234') {
			dispatch(setUserData(values));
			navigate('/articles');
		} else onFinishFailed('Не верные данные');
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
					label='Username'
					name='username'
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input placeholder='Please input your username!' />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password placeholder='Please input your password!' />
				</Form.Item>

				<Form.Item name='remember' valuePropName='checked' label={null}>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item label={null}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
			<Modal
				title='Извините, но попробуйте ввести корректные данные'
				open={isModalOpen}
				footer={false}
				closable={false}
				maskClosable={true}
				mask={true}
				onCancel={() => setIsModalOpen(false)}
				onOk={() => setIsModalOpen(false)}
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
