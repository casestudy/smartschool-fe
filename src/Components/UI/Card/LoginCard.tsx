import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, Col, Modal, Row} from 'antd';

import LoginForm from '../../Form/Login/LoginForm';
import Color from '../../../Components/UI/Header/Theme.json';
import ModalForm from '../../../Components/UI/Modal/ModalForm';
import ChangePasswordForm from '../../../Components/Form/Login/ChangePasswordForm';
import Danger from '../../../Components/UI/Icons/Danger';
import { Validators } from '../../../Theme/Validators';
import { useAppDispatch } from '../../../State/Hooks';

import { chpwdAsync } from '../../../State/Thunks/LoginThunk';

interface Prop {
  
}

interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}

const LoginCard: React.FC<Prop> = () => {
	
	const [fields, setFields] = useState<FieldData[]>([{name: ['username'], value: ''}, { name: ['emailaddress'], value: '' }, { name: ['password'], value: '' }, { name: ['cpassword'], value: '' }]);
	const [modalOkDisabled, setModalOkDisabled] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [loadingModal, setLoadingModal] = useState(false);
	const [loadingModalMessage, setLoadingModalMessage] = useState('');

	const dispatch = useAppDispatch();

	const handleOkChangePassword = () => {
		setLoadingModal(true);
		setLoadingModalMessage('Changing password...');

		if(!Validators.username.test(fields[0].value)) {
			const modal = Modal.error({
				title: 'Change Password',
				content: 'Wrong value for username',
				icon: <Danger color={Color.dashboard}/>
			});

			modal.update({});
			setLoadingModal(false);

			return ;
		}
		if(!Validators.email.test(fields[1].value)) {
			const modal = Modal.error({
				title: 'Change Password',
				content: 'Wrong value for email',
				icon: <Danger color={Color.dashboard}/>
			});

			modal.update({});
			setLoadingModal(false);
			return;
		}

		if(fields[2].value !== fields[3].value) {
			const modal = Modal.error({
				title: 'Change Password',
				content: 'Passwords do not match',
				icon: <Danger color={Color.dashboard}/>
			});

			modal.update({});
			setLoadingModal(false);
			return;
		}

		const data = {
			username: fields[0].value.split('/')[0],
			orgid: fields[0].value.split('/')[1],
			emailaddress: fields[1].value,
			password: fields[2].value
		}

		console.log(data);

		dispatch(chpwdAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				const modal = Modal.success({
					title: 'Change password',
					content: 'Code sent to your email. Please ',
				});
	
				modal.update({});

				handleCancelChangePassword();
				
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
					title: 'Change password',
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.dashboard}/>
				});
	
				modal.update({});
				setLoadingModal(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
			setLoadingModal(false);
		} );
			
	}

	const handleCancelChangePassword = () => {
		setModalVisible(false);
		setLoadingModal(false);
	}

	const showChangePasswordModal = (e: any) => {
		e.preventDefault();
		setModalVisible(true);
	}

    return (
		<>
			<Row justify='center'>
				<Col md={8}>
					<Card title="User login" size='default' extra={<Link style={{ color: 'white', fontWeight: 'bold'}} to='/' onClick={showChangePasswordModal}>Change password</Link>} style={{ width: 500, marginTop: 'calc(25vh)'}} headStyle={{background: '#007bff', color: 'white', textAlign: 'left', fontWeight: 'bold'}}>
						<LoginForm/>
					</Card>

					<ModalForm form={<ChangePasswordForm  fields={fields} setFields={setFields} username={fields[0].value} emailaddress={fields[1].value} modalDisabled={modalOkDisabled} setModalDisabled={setModalOkDisabled}/>} okColor={Color.dashboard} visible={modalVisible} title='Change password' onOk={handleOkChangePassword} onCancel={handleCancelChangePassword} onClose={handleCancelChangePassword} spin={loadingModal} spinMessage={loadingModalMessage} okDisabled={modalOkDisabled}/>
				</Col>
			</Row>
		</>
	)
};
  
  export default LoginCard;