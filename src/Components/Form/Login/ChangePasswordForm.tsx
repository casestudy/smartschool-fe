import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import { Form, Input, Modal, Select, Spin} from 'antd';

import Danger from '../../UI/Icons/Danger';
import Color from '../../UI/Header/Theme.json';

import { useAppDispatch } from '../../../State/Hooks';
import { fetchFeeTypesAsync, fetchPaymentMethodsAsync } from '../../../State/Thunks/StudentsThunks';

interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}

interface Prop {
	username?: string; //Is the id field displayed?
	emailaddress?: string;
    password?: string;
    cpassword?: string;
	fields: any;
	setFields: any;
	modalDisabled: boolean;
	setModalDisabled: any;
}

const ChangePasswordForm: React.FC<Prop> = ({username, emailaddress, password, cpassword, fields, setFields, modalDisabled, setModalDisabled}) => { 

	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');

	const dispatch = useAppDispatch();


	useEffect(() => {
				
	},[])

    return (
		<>
			<Spin spinning={loading} tip={loadingMessage}>
				<Form
					fields={fields}
					layout='horizontal'
					labelCol={{ span: 8 }}
					onFieldsChange={(_, allFields) => {
						setFields(allFields);
                        
						if(fields[0].value.length > 0 && fields[1].value.length > 0 && fields[2].value.length > 0 && fields[3].value.length > 0) {
								setModalDisabled(false);
							} else {
								setModalDisabled(true);
						}
					}}
				>
					<FormItem 
						label='Username:'
						name='username'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Username is required'}]}
					>
						<Input 
							type='text' 
							placeholder='Username' 
							style={{borderRadius: 8}} 
							value={username}
						/>
					</FormItem>
					<FormItem 
						label='Email address:'
						name='emailaddress'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Email address is required'}, {type: 'email', message: 'Invalid email format'}]}
					>
						<Input 
							type='email' 
							placeholder='Email Address' 
							style={{borderRadius: 8}} 
							value={emailaddress}
						/>
					</FormItem>
                    <FormItem 
						label='Password:'
						name='password'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Password is required'}]}
					>
						<Input 
							type='password' 
							placeholder='Password' 
							style={{borderRadius: 8}} 
							value={password}
						/>
					</FormItem>
                    <FormItem 
						label='Confirm password:'
						name='cpassword'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Enter same password as above'}]}
					>
						<Input 
							type='password' 
							placeholder='Confirm password' 
							style={{borderRadius: 8}} 
							value={cpassword}
						/>
					</FormItem>
				</Form>
			</Spin>
		</>
	);
};

const FormItem = styled(Form.Item)`
flex-direction: column !important;
align-items: flex-start;
justify-content: center;
min-width: 8rem;
margin-bottom: 2rem !important;
margin-top: 0rem !important;
row-gap: 1rem;

.ant-form-item-control {
width: 100%;
}
& .ant-form-item-label {
font-size: 14px;
font-weight: 600;
margin-bottom: 0.5rem;
}
& .ant-form-item-label
> label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
display: none;
}
& .ant-form-item-control-input-content {
border-radius: 8px;
background: #f9f9f9;
.ant-picker-input {
	flex-direction: row-reverse;
	column-gap: 5px;
	.ant-picker-suffix {
	color: inherit;
	}
	& > input {
	font-weight: 400;
	font-size: 14px;
	}
}
}

.ant-form-item-with-help .ant-form-item-explain {
font-size: 0.5rem !important;
margin-bottom: 20px;
}
& .ant-form-item-control-input-content > input {
border: solid 1px #8c8c8c;
border-radius: 9px;
font-weight: 400;
font-size: 14px;
background: #f9f9f9;
}
& .ant-form-item-control-input-content > input:focus {
border: none !important;
box-shadow: 0px 0px 0px 1px #bc647059;
border-radius: 8px;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
border-radius: 9px !important;
min-width: 12rem;
border: solid 1px #8c8c8c !important;
}
& .ant-select-selector .ant-select-selection-item {
display: flex;
align-items: center;
gap: 1rem;
font-weight: 600;
font-size: 14px;
}

.ant-form-item-control-input-content {
height: 40px;
}
.ant-form-item-control-input-content > input {
height: 100%;
}
.ant-select.ant-select-in-form-item {
height: 100%;
}
.ant-select:not(.ant-select-customize-input) .ant-select-selector {
height: 100% !important;
background: #f9f9f9;
}
.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
.ant-select-selector {
border: none !important;
box-shadow: 0px 0px 0px 1px #bc647059;
}
.ant-input-affix-wrapper {
height: 100%;
font-weight: 700;
& > input.ant-input {
	font-weight: 700;
}
}
.ant-picker {
border: solid 1px #8c8c8c;
}
.ant-picker.ant-picker-focused,
.ant-picker:hover {
border: none;
box-shadow: 0px 0px 0px 1px #bc647059;
}
.ant-form-item-control-input-content .ant-picker {
height: 100%;
border-radius: 9px;
}
.ant-form-item-label > label {
font-weight: 700;
}
.ant-select-arrow {
color: inherit !important;
}
.ant-select-open {
}
.ant-select-selection-placeholder {
display: flex !important;
align-items: center !important;
font-size: 14px !important;
}

.ant-input-group-wrapper > .ant-input-wrapper {
	height: 40px !important;
}

.ant-select{
	height: 40px !important;
	border: solid 0px transparent;
	border-width: 0px !important;
}

.ant-input-wrapper > input{
	height: 100%;
	border: solid 1px #8c8c8c;
	border-radius: 0px 8px 8px 0px !important;
}
`;

export default ChangePasswordForm;