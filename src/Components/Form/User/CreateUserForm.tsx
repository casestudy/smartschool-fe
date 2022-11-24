import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { Form, Input, Modal, Select, Spin, DatePicker} from 'antd';
import { decode as base64_decode} from 'base-64';
import moment from 'moment';

import SaveButton from '../../UI/Button/SaveButton';
import Danger from '../../UI/Icons/Danger';
import Color from '../../UI/Header/Theme.json';

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { createUsersAsync, editUsersAsync } from '../../../State/Thunks/UsersThunks';

const { TextArea } = Input;
const { Option } = Select;

interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}

interface Prop {
	username?: string;
	surname?: string;
	othernames?: string;
	emailaddress?: string;
    phonenumber?: string;
    gender?: boolean;
    dob?: any;
    idle?: string;
    locale?: string;
    utype?: string;
	disp?: string; //Is the id field displayed?
	userid?: string;
}


const CreateSubjectForm: React.FC<Prop> = ({username, surname, othernames, emailaddress, phonenumber, gender, dob, idle, locale, utype, userid, disp}) => {
	const [fields, setFields] = useState<FieldData[]>([{name: ['userid'], value: ''}, { name: ['username'], value: '' }, { name: ['utype'], value: '' }, { name: ['surname'], value: '' }, { name: ['othernames'], value: '' }, { name: ['emailaddress'], value: '' },{ name: ['phonenumber'], value: ''}, {name: 'gender', value: ''}, {name: 'dob', value: ''}, {name: 'idle', value: ''}, {name: 'locale', value: ''}]);
	const [countryCode, setCountryCode] = useState('+237');
	const [disabled, setDisabled] = useState(true);

	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const options=[
		{ value: '', label: '--' },
        { value: true, label: 'Male' },
		{ value: false, label: 'Female' },
    ];

	const localeOptions=[
		{ value: '', label: '--' },
        { value: 'en_US', label: 'English' },
		{ value: 'fr_FR', label: 'French' },
    ];

	const idleOptions=[
		{ value: '', label: '--' },
        { value: 'lockScreen', label: 'Lock Screen' },
		{ value: 'logOut', label: 'Logout' },
    ];

	const countryCodes=[
		{ value: '', label: '--' },
        { value: '+237', label: 'CMR' },
		{ value: '+255', label: 'TAN' },
    ];

	useEffect(() => {
		if(typeof userid !== 'undefined') {
			if(!(fields[1].value > 0)) {
				//Don't read
				setTimeout(() => {
					if(phonenumber !== undefined) {
						const phone = phonenumber.split(" ");
						const code = phone[0];
						const phonev = phone[1];

						setCountryCode(code);
						setFields([{name: ['userid'], value: userid }, { name: ['utype'], value: utype }, { name: ['username'], value: username }, { name: ['surname'], value: surname }, { name: ['othernames'], value: othernames }, { name: ['emailaddress'], value: emailaddress },{ name: ['phonenumber'], value: phonev }, { name: 'gender', value: gender }, { name: 'dob', value: moment(dob)}, { name: 'onidle', value: idle }, { name: 'locale', value: locale }]);
						setDisabled(false);
					}
					
				},100);
			}
		} else {
            //Userid is not set
            setTimeout(() => {
                setFields([{name: ['userid'], value: ''}, { name: ['utype'], value: utype }, { name: ['username'], value: '' }, { name: ['surname'], value: '' }, { name: ['othernames'], value: '' }, { name: ['emailaddress'], value: '' },{ name: ['phonenumber'], value: ''}, {name: 'gender', value: ''}, {name: 'dob', value: ''}, {name: 'idle', value: ''}, {name: 'locale', value: ''}]);
            }, 100)
        }
	},[])

	const onFinish = () => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			userid: fields[0].value,
			utype: fields[1].value,
			username: fields[2].value,
			surname: fields[3].value,
			othernames: fields[4].value,
			emailaddress: fields[5].value,
			phonenumber: countryCode + ' ' + fields[6].value,
			gender: fields[7].value,
			dob: fields[8].value.format('YYYY-MM-DD'),
			onidle: fields[9].value,
			locale: fields[10].value,
			localee: locale,
			position: fields[1].value === 'teacher'? `` : fields[11].value,
			connid: localStorage.getItem('connid')
		}

		setLoading(true);

		if (data.userid === '') {
			// We are adding
			console.log("Adding");
			setLoadingMessage('Creating user...');
			dispatch(createUsersAsync(data)).then((value) => {
	
				const result = value.payload;
	
				if(result.error === false) {
					data.utype === 'teacher'? navigate('/teachers') : navigate('/administrators');
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
						title: data.utype === 'teacher'? `Create : Teacher` : `Create : Administrator`,
						content: msg + ' (' + code + ')',
						cancelButtonProps: {style: {backgroundColor: Color.teachers}},
						icon: <Danger color={data.utype === 'teacher'? Color.teachers : Color.teachers}/>
					});
	
					modal.update({});
				}
				setLoading(false);
			})
		} else {
			//We are updating the user
			setLoadingMessage('Updating user...');
			dispatch(editUsersAsync(data)).then((value) => {
	
				const result = value.payload;
	
				if(result.error === false) {
					data.utype === 'teacher'? navigate('/teachers') : navigate('/administrators');
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
						title: data.utype === 'teacher'? `Modify : Teacher` : `Modify : Administrator`,
						content: msg + ' (' + code + ')',
						icon: <Danger/>
					});
	
					modal.update({});
				}
			})
			setLoading(false);
		}
	}

	return (
		<>
			<Spin spinning={loading} tip={loadingMessage}>
				<Form
					fields={fields}
					layout='inline'
					onFieldsChange={(_, allFields) => {
						setFields(allFields);
						if(fields[0].value === '') {
							//We are adding a new role
							if(fields[1].value.length > 0 && fields[2].value.length > 0 && fields[3].value.length > 0 && 
								fields[4].value.length > 0 && fields[5].value.length > 0 && fields[6].value.length > 0 && 
								fields[7].value !== '' && fields[8].value !== '' && fields[9].value !== '' && 
								fields[10].value !== '') {
								setDisabled(false);
							} else {
								setDisabled(true);
							}
						}	
					}}
				>
					<Flex>
						<InputRow style={{display: `${disp}`}}>
							<FormItem 
								label='User Id:'
								name='userid'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='User Id' 
									style={{borderRadius: 8}} 
									readOnly={true}
									value={userid}
								/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='User Type:'
								name='utype'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='User Type' 
									style={{borderRadius: 8}} 
                                    readOnly={true}
									value={utype}
								/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Username:'
								name='username'
								style={{width: '250px'}}
								rules={[{required: true, message: 'Username is required'}]}
							>
								<Input 
									type='text' 
									placeholder='User login name' 
									style={{borderRadius: 8}} 
									value={username}
								/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Surname:'
								name='surname'
								style={{width: '250px'}}
								rules={[{required: true, message: 'Surname is required'}]}
							>
								<Input 
									type='text' 
									placeholder='Surname' 
									style={{borderRadius: 8}} 
									value={surname}
								/>
							</FormItem>
						</InputRow>
					</Flex>
					<Flex>
						<InputRow>
							<FormItem 
								label='Othernames:'
								name='othernames'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Othernames is required' }]}
							>
								<Input 
									type='text' 
									placeholder='Othernames' 
									style={{borderRadius: 8}} 
									value={othernames}
								/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Email address:'
								name='emailaddress'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Email address is required'}, {type: 'email', message: 'Value is not a valid email'}]}
							>
								<Input 
									type='email' 
									placeholder='Email address' 
									style={{borderRadius: 8}} 
									value={emailaddress}
								/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Phone number:'
								name='phonenumber'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Phone number is required' }]}
							>
								<Input 
									type='number' 
									placeholder='Phone number' 
									style={{borderRadius: 8}} 
									addonBefore={<Select style={{width: '70px'}} onChange={(value) => {setCountryCode(value)}} options={countryCodes} value={'+237'}></Select>}
									value={phonenumber}
								/>
							</FormItem>							
						</InputRow>
						<InputRow>
							<FormItem 
								label='Gender:'
								name='gender'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Gender is required' }]}
							>
								<Select style={{borderRadius: 8}} options={options} value={gender}></Select>
							</FormItem>
						</InputRow>
					</Flex>
					<Flex style={{width: '100%'}}>
						<InputRow>
							<FormItem 
								label='Date of Birth:'
								name='dob'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Date of Birth is required' }]}
							>
								<DatePicker format={'YYYY-MM-DD'} showToday={false} style={{width: '250px'}}/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='On Idle:'
								name='onidle'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'On Idle' }]}
							>
								<Select style={{borderRadius: 8}} options={idleOptions} value={idle}></Select>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Locale:'
								name='locale'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Locale is required' }]}
							>
								<Select style={{borderRadius: 8}} options={localeOptions} value={locale}></Select>
							</FormItem>
						</InputRow>
					</Flex>
					<Flex>
						<InputRow>
							<FormItem>
								<SaveButton title='Cancel' size='large' bgcolor='#8C8C8C' onClick={() => {navigate('/teachers')}}/>
							</FormItem>
							<FormItem>
								<SaveButton title='Save' size='large' bgcolor={Color.teachers} disabled={disabled} onClick={onFinish}/>
							</FormItem>
						</InputRow>
					</Flex>
				</Form>
			</Spin>
		</>
	);
};

const Flex = styled.div`
	display: flex;
`;
const FormSection = styled.div``;
const FormItem = styled(Form.Item)`
	flex-direction: column !important;
	align-items: flex-start;
	justify-content: center;
	min-width: 8rem;
	margin-bottom: 3rem !important;
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
const InputRow = styled.div`;
	display: flex;
	column-gap: 1rem;
	flex-wrap: wrap;
`;

export default CreateSubjectForm;