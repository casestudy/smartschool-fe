import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

import { Button, Modal, Spin } from 'antd';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';

import ModalForm from '../../../Components/UI/Modal/ModalForm';
import CreateStudentFeeForm from '../../../Components/Form/Student/CreateStudentFeeForm'

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import Danger from '../../../Components/UI/Icons/Danger';
import PenIcon from '../../../Components/UI/Icons/Pen';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';

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
		const filt = originalStudentFees.filter((x:any) => x.descript.toLowerCase().includes(e.toLowerCase()) || x.method.toLowerCase().includes(e.toLowerCase()));
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
				//setOriginalStudentFees(dataSource);
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

		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			connid: localStorage.getItem('connid'),
			type: fields[1].value,
			method: fields[2].value,
			amount: fields[3].value,
			reference: fields[4].value,
			userid: userid,
			locale: locale
		};

		dispatch(addStudentFeeAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				console.log(dataSource);
				setOriginalStudentFees(dataSource);
				setLoadingModal(false);
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
				setLoadingModal(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	}

	const handleCancelAddFee = () => {
		setModalVisible(false);
		setLoadingModal(false);
		setFields([{name: ['feeid'], value: ''}, { name: ['ftype'], value: '' }, { name: ['fmethod'], value: '' }, { name: ['amount'], value: '' }, {name: 'reference', value: ''}]);
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
			dataIndex: 'descript',
			key: 'descript',
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
            dataIndex: 'method',
            key: 'methood',
            width: '10%'
		},
		{
            title: 'Paid On',
            dataIndex: 'paidon',
            key: 'paidon',
            width: '15%',
			render: (text:any,row:any) => {
				var date = new Date(text);
				var formattedDate = format(date, "MMMM do, yyyy");
				return <Flex>{formattedDate}</Flex>
			}
		},
		{
            title: 'Reference',
            dataIndex: 'reference',
            key: 'reference',
            width: '10%',
		},
		{
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						console.log(row);
						setFields([{name: ['feeid'], value: row.feeid}, { name: ['ftype'], value: row.descript }, { name: ['fmethod'], value: row.method }, { name: ['amount'], value: row.amount }, {name: ['reference'], value: row.reference}]);
						setModalVisible(true);
					}}>
					<PenIcon color={Color.students} size='18px' line='20px'/> 
				</Button>

				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						//localStorage.setItem("role", JSON.stringify(row));
						
					}}>
					<ThrashIcon color = {Color.students}/> 
				</Button>
			</Flex>
		},
		{
			title: 'Fee Id',
			dataIndex: 'feeid',
			key: 'feeid',
			width: '35%',
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
				<ModalForm form={<CreateStudentFeeForm disp={fields[0].value === ''? 'none' : 'block'} fields={fields} setFields={setFields} feeid={fields[0].value} amount={fields[3].value} reference={fields[4].value} modalDisabled={modalOkDisabled} setModalDisabled={setModalOkDisabled}/>} okColor={Color.students} visible={modalVisible} title={fields[0].value === ''? 'Add student fee' : 'Edit student fee'} onOk={handleOkAddFee} onCancel={handleCancelAddFee} onClose={handleCancelAddFee} spin={loadingModal} spinMessage={loadingModalMessage} okDisabled={modalOkDisabled}/>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default StudentFees;