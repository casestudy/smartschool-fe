import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Modal, Spin } from 'antd';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';
import CustomModal from '../../../Components/UI/Modal/Modal';

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';

import Color from '../../../Components/UI/Header/Theme.json';

interface Prop {
	userid?: number,
	userfullname?: string,
}

const StudentFees: React.FC<Prop> = ({userid, userfullname}) => {
	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [filteredStudentFees, setFilteredStudentFees] = useState([]);
	const [originalStudentFees, setOriginalStudentFees] = useState([]);

	const navigate = useNavigate();

	const filterTable = (e: any) => {
		const filt = originalStudentFees.filter((x:any) => x.surname.toLowerCase().includes(e.toLowerCase()) || x.othernames.toLowerCase().includes(e.toLowerCase()));
		setFilteredStudentFees(filt);
	};

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
					<AddButton hint='Add student fee' icon={<PlusIcon/>} top='-50px' float='right' color={Color.students} onClick={() => {navigate('/student/visualize/fees/add', {state: {title: 'Create New Student Fee'}})}}/>
				</Spin>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default StudentFees;