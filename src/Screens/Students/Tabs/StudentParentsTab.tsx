import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Spin } from 'antd';
import { decode as base64_decode} from 'base-64';

import styled from 'styled-components';
import CustomTable from '../../../Components/UI/Table/CustomTable';
import Color from '../../../Components/UI/Header/Theme.json';

import Danger from '../../../Components/UI/Icons/Danger';

import { useAppDispatch } from '../../../State/Hooks';
import { fetchStudentParentsAsync } from '../../../State/Thunks/StudentsThunks';

interface Prop {
	userid?: number,
	userfullname?: string,
}

const StudentParents: React.FC<Prop> = ({userid, userfullname}) => {
	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [filteredParents, setFilteredParents] = useState([]);
	const [originalParents, setOriginalParents] = useState([]);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// Methods start
	const filterTable = (e: any) => {
		const filt = originalParents.filter((x:any) => x.surname.toLowerCase().includes(e.toLowerCase()) || x.othernames.toLowerCase().includes(e.toLowerCase()));
		setFilteredParents(filt);
	};

    useEffect(() => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

        const data = {
			connid: localStorage.getItem('connid'),
            userid: userid,
			locale: locale
		};

		dispatch(fetchStudentParentsAsync(data)).then((value) => {
			const result = value.payload ;
			console.log(value);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredParents(dataSource);
				setOriginalParents(dataSource);
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
			title: 'Surname',
			dataIndex: 'surname',
			key: 'surname',
			width: '15%',
			sorter: (a: any, b: any) => a.rname.localeCompare(b.surname)
        },
        {
			title: 'Othernames',
			dataIndex: 'othernames',
			key: 'othernames',
			width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '15%'
		},
		{
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: '15%'
		},
		{
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: '10%'
		},
		{
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '15%'
		},
		{
			title: 'Userid',
			dataIndex: 'userid',
			key: 'roleid',
			width: '10%',
			hidden: true
		},
    ].filter(item => !item.hidden);

    return (
        <>
			<Flex>
            	<Spin spinning={loading} tip={loadingMessage}>
					<CustomTable 
						columns={columns} 
						source={filteredParents} 
						rowKey='userid' 
						filter={filterTable}
						searchIconColor={Color.students}
					/>
				</Spin>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default StudentParents;