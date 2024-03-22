import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { Form, Input, Modal, Select, Spin } from 'antd';

import SaveButton from '../../UI/Button/SaveButton';
import Danger from '../../UI/Icons/Danger';

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { createClassroomAsync, editclassroomAsync } from '../../../State/Thunks/ClassroomsThunk';

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
	cname?: string;
	abbreviation?: number;
	letter?: string;
	description?: string;
	disp?: string; //Is the id field displayed?
	classid?: string;
}


const CreateClassroomForm: React.FC<Prop> = ({cname, abbreviation, letter, description, classid, disp}) => {
	const [fields, setFields] = useState<FieldData[]>([{name: ['classid'], value: ''}, { name: ['name'], value: '' }, { name: ['abbreviation'], value: '' }, { name: ['letter'], value: '' }, { name: ['description'], value: ''}]);
	const [disabled, setDisabled] = useState(true);

	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
        // console.log(classid);
		if(typeof classid !== 'undefined') {
			if(!(fields[1].value > 0)) {
				//Don't read
				setTimeout(() => {
					setFields([{name: ['classid'], value: classid}, {name: ['name'] , value: cname}, {name: ['abbreviation'] , value: abbreviation}, { name: ['letter'], value: letter }, {name: ['description'], value: description}]);
					setDisabled(false);
				},100);
			}
		}
	},[])

	const onFinish = () => {
		const data = {
			classid: fields[0].value,
			name: fields[1].value,
			abbrev: fields[2].value,
			letter: fields[3].value,
			descr: fields[4].value,
			connid: localStorage.getItem('connid')
		}

		setLoading(true);

		if (data.classid === '') {
			// We are adding
			setLoadingMessage('Creating classroom...');
			dispatch(createClassroomAsync(data)).then((value) => {
	
				const result = value.payload;
	
				if(result.error === false) {
					navigate('/classrooms');
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
						title: `Create Classroom`,
						content: msg + ' (' + code + ')',
						icon: <Danger color='#D07515'/>
					});
	
					modal.update({});
				}
				setLoading(false);
			})
		} else {
			// We are updating the role
			setLoadingMessage('Updating classroom...');
			dispatch(editclassroomAsync(data)).then((value) => {
	
				const result = value.payload;
	
				if(result.error === false) {
					navigate('/classrooms');
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
						title: `Modify Classroom: `,
						content: msg + ' (' + code + ')',
                        okType: 'text',
						icon: <Danger color='#D07515'/>
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
							if(fields[1].value.length > 0 && fields[2].value.length > 0 && fields[3].value.length > 0) {
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
								label='Classroom Id:'
								name='classid'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='Classroom Id' 
									style={{borderRadius: 8}} 
									readOnly={true}
									value={classid}
								/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Name:'
								name='name'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='Classroom name' 
									style={{borderRadius: 8}} 
									value={cname}
								/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='Abbreviation:'
								name='abbreviation'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='Classroom short name' 
									style={{borderRadius: 8}} 
									value={abbreviation}
								/>
							</FormItem>
						</InputRow>
                    </Flex>
					<Flex style={{width: '100%'}}>
						<InputRow>
							<FormItem 
								label='Letter (Used when generating matricules):'
								name='letter'
								style={{width: '500px'}}
								rules={[{required: true, message: ''}]}
							>
								<Select defaultValue={letter}>
									<Option value='A'>A</Option>
									<Option value='B'>B</Option>
									<Option value='C'>C</Option>
									<Option value='D'>D</Option>
									<Option value='E'>E</Option>
									<Option value='F'>F</Option>
									<Option value='G'>G</Option>
									<Option value='H'>H</Option>
									<Option value='I'>I</Option>
									<Option value='J'>J</Option>
									<Option value='K'>K</Option>
									<Option value='L'>L</Option>
									<Option value='M'>M</Option>
									<Option value='N'>N</Option>
									<Option value='O'>O</Option>
									<Option value='P'>P</Option>
									<Option value='Q'>Q</Option>
									<Option value='R'>R</Option>
									<Option value='S'>S</Option>
									<Option value='T'>T</Option>
									<Option value='U'>U</Option>
									<Option value='V'>V</Option>
									<Option value='W'>W</Option>
									<Option value='X'>X</Option>
									<Option value='Y'>Y</Option>
									<Option value='Z'>Z</Option>
								</Select>
							</FormItem>
						</InputRow>
					</Flex>
                    <Flex style={{width: '100%'}}>
						<InputRow>
							<FormItem 
								label='Description:'
								name='description'
								style={{width: '500px', paddingBottom: '50px'}}
								rules={[{ required: true, message: '' }]}
							>
								<TextArea 
									placeholder = 'Classroom description' 
									autoSize={{ minRows:4, maxRows: 6 }} 
									style={{
										resize: 'none',
										flex: 1,
										width: '100%',
										borderRadius: 8
									}}
									value={description}
								/>
							</FormItem>
						</InputRow>
                    </Flex>
                    <Flex>
						<InputRow>
							<FormItem>
								<SaveButton title='Cancel' size='large' bgcolor='#8C8C8C' onClick={() => {navigate('/classrooms')}}/>
							</FormItem>
							<FormItem>
								<SaveButton title='Save' size='large' bgcolor='#D07515' disabled={disabled} onClick={onFinish}/>
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
`;
const InputRow = styled.div`;
	display: flex;
	column-gap: 1rem;
	flex-wrap: wrap;
`;

export default CreateClassroomForm;