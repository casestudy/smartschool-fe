import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Modal, Spin } from 'antd';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';

import ModalForm from '../../../Components/UI/Modal/ModalForm';
import CreateStudentFeeForm from '../../../Components/Form/Student/CreateStudentFeeForm'

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import Danger from '../../../Components/UI/Icons/Danger';

import Color from '../../../Components/UI/Header/Theme.json';

import { decode as base64_decode} from 'base-64';

import { useAppDispatch } from '../../../State/Hooks';
import { addStudentFeeAsync, fetchStudentFeesAsync } from '../../../State/Thunks/StudentsThunks';

interface Prop {
	userid?: number,
	userfullname?: string,
}

interface FieldData {
	name: string | number | (string | number)[];
	value?: any;
	touched?: boolean;
	validating?: boolean;
	errors?: string[];
}

const StudentFees: React.FC<Prop> = ({userid, userfullname}) => {
	const [loading, setLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [loadingModal, setLoadingModal] = useState(false);
	const [loadingModalMessage, setLoadingModalMessage] = useState('');

	const [modalOkDisabled, setModalOkDisabled] = useState(true);

	const [modalVisible, setModalVisible] = useState(false);
	const [filteredStudentFees, setFilteredStudentFees] = useState([]);
	const [originalStudentFees, setOriginalStudentFees] = useState([]);

	const [fields, setFields] = useState<FieldData[]>([{name: ['feeid'], value: ''}, { name: ['ftype'], value: '' }, { name: ['fmethod'], value: '' }, { name: ['amount'], value: '' }, {name: 'reference', value: ''}]);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalStudentFees.filter((x:any) => x.surname.toLowerCase().includes(e.toLowerCase()) || x.othernames.toLowerCase().includes(e.toLowerCase()));
		setFilteredStudentFees(filt);
	};

	useEffect(() => {
		setLoadingMessage('Fetching student fees');
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

        const data = {
			connid: localStorage.getItem('connid'),
            userid: userid,
			locale: locale
		};

		dispatch(fetchStudentFeesAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				let dataSource = result.result.value;

				for (let i = 0; i < filteredStudentFees.length; i++) {
					const element: any = filteredStudentFees[i];
					dataSource = dataSource.filter((x:any) => x.mode !== element.mode) ;
				}

				setFilteredStudentFees(dataSource);
				setOriginalStudentFees(dataSource);
				setLoading(false);
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
					title: 'Students',
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

	const handleOkAddFee = () => {
		setLoadingModal(true);
		setLoadingModalMessage('Adding student fee.');

		const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(addStudentFeeAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setOriginalStudentFees(dataSource);
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
	}

	const handleCancelAddFee = () => {
		setModalVisible(false);
	}

	// Columns definition start
	const columns = [
		{
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '5%',
			render: (text:any,record:any,index:any) => (index+1)
        },
        {
			title: 'Fee',
			dataIndex: 'fee',
			key: 'fee',
			width: '10%',
			sorter: (a: any, b: any) => a.rname.localeCompare(b.surname)
        },
        {
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			width: '10%'
        },
        {
            title: 'Paid By',
            dataIndex: 'paidby',
            key: 'paidby',
            width: '10%'
		},
		{
            title: 'Paid On',
            dataIndex: 'paidon',
            key: 'paidon',
            width: '10%'
		},
		{
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
            width: '10%',
		},
		// {
        //     title: 'Action',
        //     dataIndex: 'action',
        //     key: 'action',
        //     width: '15%',
		// },
		{
			title: 'Fee Id',
			dataIndex: 'feeid',
			key: 'feeid',
			width: '45%',
			hidden: true
		},
    ].filter(item => !item.hidden);

    return (
        <>
			<Flex>
				<Spin spinning={loading} tip={loadingMessage}>
					<CustomTable 
						columns={columns} 
						source={filteredStudentFees} 
						rowKey='feeid' 
						filter={filterTable}
						searchIconColor={Color.students}
					/>
					<AddButton hint='Add student fee' icon={<PlusIcon/>} top='-50px' float='right' color={Color.students} onClick={() => {setModalVisible(true)}}/>
				</Spin>
				<ModalForm form={<CreateStudentFeeForm disp='none' fields={fields} setFields={setFields} modalDisabled={modalOkDisabled} setModalDisabled={setModalOkDisabled}/>} okColor={Color.students} visible={modalVisible} title='Add student fee' onOk={handleOkAddFee} onCancel={handleCancelAddFee} onClose={handleCancelAddFee} spin={loadingModal} spinMessage={loadingModalMessage} okDisabled={modalOkDisabled}/>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default StudentFees;