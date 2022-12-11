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
import { createStudentAsync, editStudentAsync } from '../../../State/Thunks/StudentsThunks';
import { fetchClassroomsAsync } from '../../../State/Thunks/ClassroomsThunk';

interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}

interface Prop {
	matricule?: string;
	surname?: string;
	othernames?: string;
    gender?: boolean;
    dob?: any;
    pob?: string;
    classid?: number;
	disp?: string; //Is the id field displayed?
	userid?: string;
}


const CreateStudentForm: React.FC<Prop> = ({matricule, surname, othernames, gender, dob, pob, classid, userid, disp}) => {
	const [fields, setFields] = useState<FieldData[]>([{name: ['userid'], value: ''}, { name: ['matricule'], value: '' }, { name: ['surname'], value: '' }, { name: ['othernames'], value: '' }, {name: 'gender', value: ''}, {name: 'dob', value: ''}, {name: 'pob', value: ''}, {name: 'classid', value: ''}]);
	const [disabled, setDisabled] = useState(true);

	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');
    const [classOptions, setClassOptions] = useState([]);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const options=[
		{ value: '', label: '--' },
        { value: true, label: 'Male' },
		{ value: false, label: 'Female' },
    ];

	useEffect(() => {
		if(typeof userid !== 'undefined') {
			if(!(fields[1].value > 0)) {
				//Don't read
				setTimeout(() => {
					setFields([{name: ['userid'], value: userid }, { name: ['matricule'], value: matricule }, { name: ['surname'], value: surname }, { name: ['othernames'], value: othernames }, { name: 'gender', value: gender }, { name: 'dob', value: dob !== null? moment(dob) : ''}, { name: 'pob', value: pob }, { name: 'classid', value: classid }]);
					setDisabled(false);
				},100);
			}
		} else {
            //Userid is not set
            setTimeout(() => {
                setFields([{name: ['userid'], value: ''}, { name: ['matricule'], value: '' }, { name: ['surname'], value: '' }, { name: ['othernames'], value: '' },{name: 'gender', value: ''}, {name: 'dob', value: ''}, {name: 'pob', value: ''}, { name: 'classid', value: '' }]);
            }, 100)
        }

        const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchClassroomsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
                setClassOptions(dataSource);
			} else {
				//An axios error
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
					title: `Classrooms`,
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.students}/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	},[])

	const onFinish = () => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			userid: fields[0].value,
			matricule: fields[1].value,
			surname: fields[2].value,
			othernames: fields[3].value,
			gender: fields[4].value,
			dob: fields[5].value.format('YYYY-MM-DD'),
			pob: fields[6].value,
            classid: fields[7].value,
			locale: locale,
			localee: locale,
			connid: localStorage.getItem('connid')
		}

		setLoading(true);

		if (data.userid === '') {
			// We are adding
			setLoadingMessage('Creating student...');
			dispatch(createStudentAsync(data)).then((value) => {
	
				const result = value.payload;
				console.log(result);
	
				if(result.error === false) {
					navigate('/students');
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
						title: `Create: Student`,
						content: msg + ' (' + code + ')',
						cancelButtonProps: {style: {backgroundColor: Color.teachers}},
						icon: <Danger color={Color.students}/>
					});
	
					modal.update({});
				}
				setLoading(false);
			})
		} else {
			//We are updating the user
			console.log(data);
			setLoadingMessage('Updating student...');
			dispatch(editStudentAsync(data)).then((value) => {
	
				const result = value.payload;
	
				if(result.error === false) {
					setLoading(false);
					navigate('/students');
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
						title:`Modify: Student`,
						content: msg + ' (' + code + ')',
						icon: <Danger color={ Color.students }/>
					});
	
					modal.update({});
				}
			})
			setLoading(false);
		}
	}

	function disabledDate(current:any) {
		var today = new Date();
		let customDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		return current && current > moment(customDate, "YYYY-MM-DD");
	}

	return (
		<>
			<Spin spinning={loading} tip={loadingMessage}>
				<Form
					fields={fields}
					layout='inline'
					onFieldsChange={(_, allFields) => {
						setFields(allFields);
                        
						if(fields[0].value === '' && fields[1].value === '') {
                            //console.log(fields);
							//We are adding a new role
							if(fields[2].value.length > 0 && fields[3].value.length > 0 && fields[4].value !== '' && 
								fields[5].value !== '' && fields[6].value.length > 0 && fields[7].value !== ''
							) {
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
								label='Student Id:'
								name='userid'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='Student Id' 
									style={{borderRadius: 8}} 
									readOnly={true}
									value={userid}
								/>
							</FormItem>
						</InputRow>
						<InputRow style={{display: `${disp}`}}>
							<FormItem 
								label='Matricule:'
								name='matricule'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='Student matricule' 
									style={{borderRadius: 8}} 
                                    readOnly={true}
									value={matricule}
								/>
							</FormItem>
						</InputRow>
                    </Flex>
                    <Flex>
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
								<DatePicker format={'YYYY-MM-DD'} disabledDate={disabledDate} showToday={false} style={{width: '250px'}}/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Place of birth:'
								name='pob'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Place of birth is required' }]}
							>
								<Input 
									type='text' 
									placeholder='Place of birth' 
									style={{borderRadius: 8}} 
									value={pob}
								/>
							</FormItem>
						</InputRow>
                        <InputRow>
							<FormItem 
								label='Classroom:'
								name='classid'
								style={{width: '250px'}}
								rules={[{ required: true, message: 'Classroom is required' }]}
							>
								<Select style={{borderRadius: 8}} options={classOptions.map((option: any) => ({
                                    value: option.classid,
                                    label: option.cname + ' (' + option.abbreviation+')'
                                }))} value={classid}></Select>
							</FormItem>
						</InputRow>
					</Flex>
					<Flex>
						<InputRow>
							<FormItem>
								<SaveButton title='Cancel' size='large' bgcolor='#8C8C8C' onClick={() => {navigate('/students')}}/>
							</FormItem>
							<FormItem>
								<SaveButton title='Save' size='large' bgcolor={Color.students} disabled={disabled} onClick={onFinish}/>
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

export default CreateStudentForm;