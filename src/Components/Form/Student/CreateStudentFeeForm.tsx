import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { Form, Input, Modal, Select, Spin, DatePicker} from 'antd';
import { decode as base64_decode} from 'base-64';
import moment from 'moment';

import SaveButton from '../../UI/Button/SaveButton';
import Danger from '../../UI/Icons/Danger';
import Color from '../../UI/Header/Theme.json';

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
}

const CreateStudentFeeForm: React.FC<Prop> = ({ftype, fmethod, amount, reference, feeid, disp}) => { 
	const [fields, setFields] = useState<FieldData[]>([{name: ['feeid'], value: ''}, { name: ['ftype'], value: '' }, { name: ['fmethod'], value: '' }, { name: ['amount'], value: '' }, {name: 'reference', value: ''}, {name: 'feeid', value: ''}]);
	const [disabled, setDisabled] = useState(true);

	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');

    return (
		<>
			<Spin spinning={loading} tip={loadingMessage}>
				<Form
					fields={fields}
					layout='inline'
					onFieldsChange={(_, allFields) => {
						setFields(allFields);
                        
						// if(fields[0].value === '' && fields[1].value === '') {
                        //     //console.log(fields);
						// 	//We are adding a new role
						// 	if(fields[2].value.length > 0 && fields[3].value.length > 0 && fields[4].value !== '' && 
						// 		fields[5].value !== '' && fields[6].value.length > 0 && fields[7].value !== ''
						// 	) {
						// 		setDisabled(false);
						// 	} else {
						// 		setDisabled(true);
						// 	}
						// }	
					}}
				>
					<Flex>
						<InputRow style={{display: `${disp}`}}>
							<FormItem 
								label='Fee Id:'
								name='feeid'
								style={{width: '250px'}}
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
						</InputRow>
						<InputRow style={{display: `${disp}`}}>
							<FormItem 
								label='Fee Type:'
								name='ftype'
								style={{width: '250px'}}
								rules={[{required: true, message: ''}]}
							>
								<Input 
									type='text' 
									placeholder='Fee Type' 
									style={{borderRadius: 8}} 
                                    readOnly={true}
									value={ftype}
								/>
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

export default CreateStudentFeeForm;