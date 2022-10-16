import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Form, Input, Button } from 'antd';

import User from '../UI/Icons/User';
import Lock from '../UI/Icons/Lock';
import Login from '../UI/Icons/Login';

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
}



const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields, button }) => (
    <>
		<Form 
			name='loginform'
			fields={fields}
			onFieldsChange={(_, allFields) => {
				onChange(allFields);
			}}>

			<Form.Item
				name="username"
				rules={[{ required: true, message: 'Please input your Username!' }]} style={{textAlign: "left"}}>
				<Input size='small' prefix={<User color='#000' size='18px' line='20px' />} placeholder="Username" style={{borderRadius: "5px"}}/>
			</Form.Item>

			<Form.Item
				name="password"
				rules={[{ required: true, message: 'Please input your Password!' }]} style={{textAlign: "left"}}>
				<Input.Password size='small' prefix={<Lock color='#000' size='18px' line='20px' />} placeholder="Password" style={{borderRadius: "5px"}} />
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit" icon={<Login color='#fff' size='18px' line='20px' padding='0 0 0 0'/>} disabled={button}>
					 <span style={{fontWeight: 'bold'}}>Login</span>
				</Button>
			</Form.Item>

		</Form>
    </>
);

const LoginForm: React.FC = () => {
	const [fields, setFields] = useState<FieldData[]>([{ name: ['username'], value: '' },{ name: ['password'], value: ''}]);
	const [disabled, setDisabled] = useState(true);

	return (
		<>
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
			/>
		</>
	);
};
  
export default LoginForm;