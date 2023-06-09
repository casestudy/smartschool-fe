import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Form, Input, Button, Divider, Typography, Modal, Spin } from 'antd';
import { encode as base64_encode} from 'base-64';

import User from '../../UI/Icons/User';
import Lock from '../../UI/Icons/Lock';
import Login from '../../UI/Icons/Login';
import Danger from '../../UI/Icons/Danger';

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { loginUserAsync } from '../../../State/Thunks/LoginThunk';
import { magik } from '../../../AppEnv';

import './LoginForm.css'

interface Prop {
  
}

const tailFormItemLayout = {
	wrapperCol: {
	  xs: {
		span: 24,
		offset: 0,
	  },
	  sm: {
		span: 2,
		offset: 0,
	  },
	},
};

interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}

interface CustomizedFormProps {
	onChange: (fields: FieldData[]) => void;
	fields: FieldData[];
	button: boolean;
	finish: any;
}

const { Paragraph } = Typography;

const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, button, finish }) => (
    <>
		<Form 
			name='loginform'
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}
			onFinish={finish}>

			<Form.Item
				name="username"
				rules={[{ required: true, message: 'Please input your Username!' }]} style={{textAlign: "left"}}>
				<Input data-cy="username" prefix={<User color='#000' size='18px' line='20px' />} placeholder="Username" style={{borderRadius: "5px"}}/>
			</Form.Item>

			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Please input your Password!' }]} style={{textAlign: "left"}}>
				<Input.Password data-cy="password" prefix={<Lock color='#000' size='18px' line='20px' />} placeholder="Password" style={{borderRadius: "5px"}} />
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button data-cy="submitLogin" type="primary" htmlType="submit" icon={<Login color='#fff' size='18px' line='20px' padding='0 0 0 0'/>} disabled={button}>
					 <span style={{fontWeight: 'bold'}}>Login</span>
				</Button>
			</Form.Item>

			<Divider
				type="horizontal"
				style={{
					backgroundColor: "#000",
					width: "0.1rem",
					height: "0.1rem",
					margin: "0 0 0 0",
				}}
			/>

			<Paragraph style={{textAlign: 'left', fontSize: '11px', paddingTop: '10px'}}>This system is for the use of authorized users only. 
					By clicking on the Login button above and logging, you agree to the terms and conditions of both your 
					institution and that of Smart Systems.</Paragraph>

		</Form>
    </>
);

const LoginForm: React.FC = () => {
	const [fields, setFields] = useState<FieldData[]>([{ name: ['username'], value: '' },{ name: ['password'], value: ''}]);
	const [disabled, setDisabled] = useState(true);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const toggle = (checked: boolean) => {
		setLoading(checked);
	};

	const dispatch = useAppDispatch();

	const onFinish = (values: any) => {
		
		const usrorg = values.username.split('/');
		const username = usrorg[0];
		const orgid = usrorg[1];
		
		const data = {
			username: username,
			password: values.password,
			orgid: orgid,
			magik: magik,
			mid: "femencha",
			midtype: "host",
			locale: "en"
		};

		dispatch(loginUserAsync(data)).then((value) => {
			toggle(true);
			const result = value.payload ;

			if(result.error === false) {
				toggle(false);
				localStorage.setItem("loggedin", "true");

				const lln = result.result.value[0][0].lastlogin;
				const appid = result.result.value[0][0].app_id;

				let dateTime = lln.split('T');
				let date = dateTime[0];
				let time = dateTime[1].split('.')[0];

				let ll= '';

				let m_names = ['January', 'February', 'March', 'April', 'May', 'June', 
							'July', 'August', 'September', 'October', 'November', 'December'];

				let w_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

				let d = new Date(date);

				ll += w_names[d.getDay()] + ' ' + d.getDate() + ', ' + m_names[d.getMonth()] + ' ' + d.getFullYear() + ' at ' + time;

				let encoded = base64_encode(JSON.stringify(result));
				localStorage.setItem("data", encoded);
				localStorage.setItem("lastlogin",ll);
				localStorage.setItem("connid",appid);
				
				window.location.reload();
				navigate('/dashboard');
			} else { 
				//Probably an error due to axios. check for status 400 first
				let msg = '';
				let code = '';
				if(result.status === 400) {
					msg = result.message;
					code = result.code;
				} else {
					//It is error from the back end
					msg = result.error.msg;
					code = result.error.code;
				}
				const modal = Modal.error({
					title: `Login`,
					content: msg + ' (' + code + ')',
					icon: <Danger/>
				});

				modal.update({});
				toggle(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );

		//TODO: remember to load dashboard here on success
	};

	return (
		<>
			<Spin spinning={loading} tip="Login in...">
				<CustomizedForm
					fields={fields}
					onChange={newFields => {
						setFields(newFields);
						if(fields[0].value.length > 0 && fields[1].value.length > 0) {
							setDisabled(false);
						} else {
							setDisabled(true);
						}
					}}
					button={disabled}
					finish={onFinish}
				/>
			</Spin>
		</>
	);
};
  
export default LoginForm;