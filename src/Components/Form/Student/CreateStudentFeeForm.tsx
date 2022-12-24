import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { Form, Input, Modal, Select, Spin, DatePicker} from 'antd';
import { decode as base64_decode} from 'base-64';
import moment from 'moment';

import SaveButton from '../../UI/Button/SaveButton';
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
	ftype?: string;
	fmethod?: string;
	amount?: string;
    reference?: any;
	disp?: string; //Is the id field displayed?
	feeid?: string;
	fields: any;
	setFields: any;
	modalDisabled: boolean;
	setModalDisabled: any;
}

const CreateStudentFeeForm: React.FC<Prop> = ({ftype, fmethod, amount, reference, feeid, disp, fields, setFields, modalDisabled, setModalDisabled}) => { 
	//const [fields, setFields] = useState<FieldData[]>([{name: ['feeid'], value: ''}, { name: ['ftype'], value: '' }, { name: ['fmethod'], value: '' }, { name: ['amount'], value: '' }, {name: 'reference', value: ''}]);
	//const [disabled, setDisabled] = useState(true);

	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');

	const [feeTypeOptions, setFeeTypeOptions] = useState([]);
	const [feePayOptions, setFeePayOptions] = useState([]);

	const dispatch = useAppDispatch();


	useEffect(() => {
		if(typeof feeid !== 'undefined') {
			if(!(fields[1].value > 0)) {
				//Don't read
				setTimeout(() => {
					setFields([{name: ['feeid'], value: feeid}, { name: ['ftype'], value: ftype }, { name: ['fmethod'], value: fmethod }, { name: ['amount'], value: amount }, { name: 'reference', value: reference }]);
					setModalDisabled(false);
				},100);
			}
		} else {
            //feeid is not set
            setTimeout(() => {
                setFields([{name: ['feeid'], value: '' }, { name: ['ftype'], value: '' }, { name: ['fmethod'], value: '' }, { name: ['amount'], value: '' }, { name: 'reference', value: '' }]);
            }, 100)
        }

        const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchFeeTypesAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				let dataSource = result.result.value;
				dataSource = [{ftype: '', descript:'--'}].concat(dataSource);
                setFeeTypeOptions(dataSource);

				dispatch(fetchPaymentMethodsAsync(data)).then((value) => {
					const result = value.payload ;
					//console.log(result);
					if(result.error === false) {
						// We have the db results here
						let dataSource = result.result.value;
						dataSource = [{method: '', descript:'--'}].concat(dataSource);
						setFeePayOptions(dataSource);
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
							title: `Fees`,
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
					title: `Fees`,
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

    return (
		<>
			<Spin spinning={loading} tip={loadingMessage}>
				<Form
					fields={fields}
					layout='horizontal'
					labelCol={{ span: 8 }}
					onFieldsChange={(_, allFields) => {
						setFields(allFields);
                        
						if(fields[0].value === '') {
                            //console.log(fields);
							//We are adding a new role
							if(fields[1].value.length > 0 && fields[2].value.length > 0 && fields[3].value.length > 0 && fields[4].value.length > 0 
							) {
								setModalDisabled(false);
							} else {
								setModalDisabled(true);
							}
						}	
					}}
				>
					<FormItem 
						label='Fee Id:'
						name='feeid'
						style={{width: '450px', display: `${disp}`}}
						rules={[{required: true, message: ''}]}
					>
						<Input 
							type='text' 
							placeholder='Fee Id' 
							style={{borderRadius: 8}} 
							readOnly={true}
							value={feeid}
						/>
					</FormItem>
					<FormItem 
						label='Fee Type:'
						name='ftype'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Fee type is required'}]}
					>
						<Select style={{borderRadius: 8}} options={feeTypeOptions.map((option: any) => ({
                                    value: option.ftype,
                                    label: option.descript
                                }))} value={ftype}></Select>
					</FormItem>
					<FormItem 
						label='Payment Method:'
						name='fmethod'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Payment Method is required'}]}
					>
						<Select style={{borderRadius: 8}} options={feePayOptions.map((option: any) => ({
                                    value: option.method,
                                    label: option.descript
                                }))} value={fmethod}></Select>
					</FormItem>
					<FormItem 
						label='Fee Amount:'
						name='amount'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Fee Amount is required'}]}
					>
						<Input 
							type='text' 
							placeholder='Amount paid' 
							style={{borderRadius: 8}} 
							value={amount}
						/>
					</FormItem>
					<FormItem 
						label='Payment Reference:'
						name='reference'
						style={{width: '450px'}}
						rules={[{required: true, message: 'Payment Reference is required'}]}
					>
						<Input 
							type='text' 
							placeholder='Reference number' 
							style={{borderRadius: 8}} 
							value={reference}
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

export default CreateStudentFeeForm;