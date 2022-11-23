import  React, { useEffect, useState } from 'react';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';

import styled from 'styled-components';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../State/Hooks';

import { fetchClassroomTeachersAsync } from '../../../State/Thunks/ClassroomsThunk';
import { Modal } from 'antd';
import Danger from '../../../Components/UI/Icons/Danger';

interface Prop {
    classid: string;
	locale: string;
}

const ClassroomTeachersTab: React.FC<Prop> = ({classid, locale}) => {
    const [loading, setLoading] = useState(true);
	const [originalTeachers, setOriginalTeachers] = useState([]);
	const [filteredTeachers, setFilteredTeachers] = useState([]);

    const navigate = useNavigate();
	const dispatch = useAppDispatch();

    const filterTable = (e: any) => {
		const filt = originalTeachers.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredTeachers(filt);
	};

    const columns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '2%',
			render: (text:any,record:any,index:any) => (index+1)
        },
        {
			title: 'Surname',
			dataIndex: 'surname',
			key: 'surname',
			width: '15%',
			sorter: (a: any, b: any) => a.surname.localeCompare(b.surname)
        },
		{
			title: 'Othernames',
			dataIndex: 'othernames',
			key: 'othernames',
			width: '15%',
			sorter: (a: any, b: any) => a.othernames.localeCompare(b.othernames)
        },
		{
			title: 'Subject name',
			dataIndex: 'sname',
			key: 'sname',
			width: '10%',
			sorter: (a: any, b: any) => a.sname.localeCompare(b.sname)
        },
        {
			title: 'Subject code',
			dataIndex: 'scode',
			key: 'scode',
			width: '10%'
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
		},
		{
			title: 'Subject Id',
			dataIndex: 'subjectid',
			key: 'subjectid',
			width: '5%',
			hidden: true
		},
		{
			title: 'Teacher Id',
			dataIndex: 'teacherid',
			key: 'teacherid',
			width: '38%',
			hidden: true
        },
    ].filter(item => !item.hidden);

    useEffect(() => {
        const data = {
			connid: localStorage.getItem('connid'),
			locale: locale,
			classid: classid
		};

		dispatch(fetchClassroomTeachersAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				console.log(dataSource);
				//setFilteredClassrooms(dataSource);
				//setOriginalClassrooms(dataSource);
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
					title: `Classrooms`,
					content: msg + ' (' + code + ')',
					icon: <Danger color='#D07515'/>
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
			<Flex>
                <CustomTable columns={columns} source={filteredTeachers} searchIconColor='#D07515' rowKey='classid' filter={filterTable}/>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default ClassroomTeachersTab;