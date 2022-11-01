import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { Form, Input, Modal } from 'antd';

import SaveButton from '../../UI/Button/SaveButton';
import Danger from '../../UI/Icons/Danger';

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { createRoleAsync } from '../../../State/Thunks/RolesThunk';

const { TextArea } = Input;

interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}

interface Prop {

}


const CreateRoleForm: React.FC<Prop> = () => {
	const [fields, setFields] = useState<FieldData[]>([{ name: ['name'], value: '' },{ name: ['description'], value: ''}]);
	const [disabled, setDisabled] = useState(true);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onFinish = () => {
		const data = {
			rname: fields[0].value,
			descriptt: fields[1].value,
			connid: localStorage.getItem('connid')
		}

		dispatch(createRoleAsync(data)).then((value) => {
			console.log(value.payload);

			const result = value.payload;

			if(result.error === false) {
				navigate('/roles');
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
					title: `Create Role`,
					content: msg + ' (' + code + ')',
					icon: <Danger/>
				});

				modal.update({});
			}
		})
	}

	return (
		<>
			<Form
				fields={fields}
				layout='vertical'
				onFieldsChange={(_, allFields) => {
					setFields(allFields);
					if(fields[0].value.length > 0 && fields[1].value.length > 0) {
						setDisabled(false);
					} else {
						setDisabled(true);
					}
				}}
			>
				<Flex>
					<InputRow>
						<FormItem 
							label='Name:'
							name='name'
							style={{width: '250px'}}
							rules={[{required: true, message: ''}]}
						>
							<Input type='text' placeholder='Role name' style={{borderRadius: 8}}/>
						</FormItem>
					</InputRow>
					<InputRow>
						<FormItem 
							label='Description:'
							name='description'
							style={{width: '500px', paddingBottom: '50px'}}
							rules={[{ required: true, message: '' }]}
						>
							<TextArea 
								placeholder = 'Role description' 
								autoSize={{ minRows:4, maxRows: 6 }} 
								style={{
									resize: 'none',
									flex: 1,
									width: '100%',
									borderRadius: 8
								}}
							/>
						</FormItem>
					</InputRow>
					<InputRow>
						<FormItem>
						 	<SaveButton title='Cancel' size='large' bgcolor='#8C8C8C' onClick={() => {navigate('/roles')}}/>
						</FormItem>
						<FormItem>
						 	<SaveButton title='Save' size='large' bgcolor='#BC6470' disabled={disabled} onClick={onFinish}/>
						</FormItem>
					</InputRow>
				</Flex>
			</Form>
		</>
	);
};

const Flex = styled.div`

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

export default CreateRoleForm;