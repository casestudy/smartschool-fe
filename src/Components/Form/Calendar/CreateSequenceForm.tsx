import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';

import { DatePicker, Form, Input, Modal, Select, Spin } from 'antd';
import { decode as base64_decode} from 'base-64';

import SaveButton from '../../UI/Button/SaveButton';
import Danger from '../../UI/Icons/Danger';
import Color from '../../UI/Header/Theme.json';

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { fetchExamTypeAsync, createExamAsync, modifyExamAsync } from '../../../State/Thunks/CalendarThunk';
import moment from 'moment';

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
	sdate?: any;
	edate?: any;
	etype?: string;
	examid?: string;
	termid?: string;
    disp?: string; //Is the id field displayed?
}


const CreateSequenceForm: React.FC<Prop> = ({sdate, edate, etype, examid, termid, disp}) => {
	const [fields, setFields] = useState<FieldData[]>([{name: ['termid'], value: ''}, { name: ['sdate'], value: '' }, { name: ['edate'], value: '' }, { name: ['etype'], value: ''}]);
	const [disabled, setDisabled] = useState(true);

	const [loading, setLoading] = useState(false);
	const [yid, setYearId] = useState();
	const [loadingMessage, setLoadingMessage] = useState('');
    const [examTypeOptions, setExamTypeOptions] = useState([]);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { state } = useLocation();

	useEffect(() => {
		setYearId(state.yearid);

		if(typeof examid !== 'undefined') {
			if(!(fields[0].value > 0)) {
				//Don't read
				setTimeout(() => {
					setFields([{name: ['examid'], value: examid}, {name: ['sdate'] , value: sdate !== null? moment(sdate) : ''}, {name: ['edate'] , value: edate !== null? moment(edate) : ''}, {name: ['etype'], value: etype}]);
					setDisabled(false);
				},100);
			}
		} else {
			setTimeout(() => {
				setFields([{name: ['examid'], value: ''}, {name: ['sdate'] , value: ''}, {name: ['edate'] , value: ''}, {name: ['etype'], value: ''}]);
				setDisabled(false);
			},100);
		}

        const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchExamTypeAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
                setExamTypeOptions(dataSource);
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
					title: `Get Examination Types`,
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.calendar}/>
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
        const store : any = b64 ? base64_decode(b64): '' ;
        const locale = store ? JSON.parse(store).result.value[0][0].locale : '';
		
		const data = {
			examid: fields[0].value,
			start: fields[1].value.format('YYYY-MM-DD'),
			end: fields[2].value.format('YYYY-MM-DD'),
			etype: fields[3].value,
			connid: localStorage.getItem('connid'),
			locale: locale,
		}

		setLoading(true);

		if (data.examid === '') {
			// We are adding
			setLoadingMessage('Creating examination...');
			dispatch(createExamAsync(data)).then((value) => {
	
				const result = value.payload;
	
				if(result.error === false) {
					navigate('/calendar/terms/visualize', {state: {termid: state.termid}});
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
						title: `Create Examination`,
						content: msg + ' (' + code + ')',
						icon: <Danger color='#D07515'/>
					});
	
					modal.update({});
				}
				setLoading(false);
			})
		} else {
			//We are updating the role
			setLoadingMessage('Updating examination...');
			dispatch(modifyExamAsync(data)).then((value) => {
	
				const result = value.payload;
	
				if(result.error === false) {
					navigate('/calendar/terms/visualize', {state: {termid: state.termid}});
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
						title: `Modify Examination`,
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

    function disabledDate(current:any) {
		var today = new Date();
		let customDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		return current && current < moment(customDate, "YYYY-MM-DD");
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
							if(fields[1].value != '' && fields[2].value != '' && fields[3].value.length > 0) {
								setDisabled(false);
							} else {
								setDisabled(true);
							}
						}	
					}}
				>
					<Flex style={{width: '100%'}}>
						<InputRow style={{display: `${disp}`}}>
							<FormItem 
								label='Exam Id:'
								name='examid'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='Exam Id' 
									style={{borderRadius: 8}} 
									readOnly={true}
									value={examid}
								/>
							</FormItem>
						</InputRow>
					</Flex>
					<Flex style={{width: '100%'}}>
						<InputRow>
							<FormItem 
								label='Start date:'
								name='sdate'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<DatePicker format={'YYYY-MM-DD'} disabledDate={disabledDate} showToday={false} style={{width: '250px'}}/>
							</FormItem>
						</InputRow>
						<InputRow>
							<FormItem 
								label='End date:'
								name='edate'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<DatePicker format={'YYYY-MM-DD'} disabledDate={disabledDate} showToday={false} style={{width: '250px'}}/>
							</FormItem>
						</InputRow>
                    </Flex>
                    <Flex style={{width: '100%'}}>
						<InputRow>
							<FormItem 
								label='Exam Type:'
								name='etype'
								style={{width: '500px', paddingBottom: '50px'}}
								rules={[{ required: true, message: '' }]}
							>
								<Select style={{borderRadius: 8}} options={examTypeOptions.map((option: any) => ({
                                    value: option.name,
                                    label: option.descript
                                }))} value={etype}></Select>
							</FormItem>
						</InputRow>
                    </Flex>
                    <Flex>
						<InputRow>
							<FormItem>
								<SaveButton title='Cancel' size='large' bgcolor='#8C8C8C' onClick={() => {navigate('/calendar/terms', {state: {yearid: yid}})}}/>
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

export default CreateSequenceForm;