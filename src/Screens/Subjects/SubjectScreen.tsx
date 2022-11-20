import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Row , Col, Button, Modal, Spin } from 'antd';

import Header from '../../Components/UI/Header/Header';
import CustomTable from '../../Components/UI/Table/CustomTable';
import AddButton from '../../Components/UI/Button/AddButton';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import PenIcon from '../../Components/UI/Icons/Pen';
import Danger from '../../Components/UI/Icons/Danger';
import PlusIcon from '../../Components/UI/Icons/PlusIcon';
import ThrashIcon from '../../Components/UI/Icons/ThrashIcon';

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchSubjectsAsync} from '../../State/Thunks/SubjectsThunk';

const SubjectScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(true);
	const [originalSubjects, setOriginalSubjects] = useState([]);
	const [filteredSubjects, setFilteredSubjects] = useState([]);

	let ll: any = localStorage.getItem('lastlogin');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalSubjects.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredSubjects(filt);
	};

	const columns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '5%',
			render: (text:any,record:any,index:any) => (index+1)
        },
        {
			title: 'Name',
			dataIndex: 'sname',
			key: 'sname',
			width: '20%',
			sorter: (a: any, b: any) => a.sname.localeCompare(b.sname)
        },
		{
			title: 'Code',
			dataIndex: 'code',
			key: 'code',
			width: '15%',
			sorter: (a: any, b: any) => a.code.localeCompare(b.code)
        },
		{
			title: 'Coefficient',
			dataIndex: 'coefficient',
			key: 'coefficient',
			width: '15%',
			sorter: (a: any, b: any) => a.coefficient.localeCompare(b.coefficient)
        },
        {
			title: 'Description',
			dataIndex: 'descript',
			key: 'descript',
			width: '30%'
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						//console.log(row.sname);
						navigate('/subjects/new', {
							state: {
								title: 'Modify Subject', 
								subjectid: row.subjectid,
								subjectname: row.sname,
								subjectcode: row.code,
								subjectcoef: row.coefficient,
								subjectdesc: row.descript
							}
						})
					}}>
					<PenIcon color='#5E92A8' size='18px' line='20px'/> 
				</Button>

				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						localStorage.setItem("role", JSON.stringify(row));
						navigate('/roles/visualize');
					}}>
					<ThrashIcon color='#5E92A8'/> 
				</Button>
			</Flex>
		},
		{
			title: 'Subject Id',
			dataIndex: 'subjectid',
			key: 'subjectid',
			width: '10%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	useEffect(() => {
		const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchSubjectsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredSubjects(dataSource);
				setOriginalSubjects(dataSource);
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
					title: `Subjects`,
					content: msg + ' (' + code + ')',
					icon: <Danger/>
				});
	
				modal.update({});
				setLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	}, [])

    return (
        <Flex>
			<Spin spinning={loading} tip="Fetching subjects...">
				<Header title='Subjects' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<Flex style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredSubjects} searchIconColor='#5E92A8' rowKey='subjectid' filter={filterTable}/>
							<AddButton hint='Create new subject' icon={<PlusIcon/>} top='-50px' float='right' color='#5E92A8' onClick={() => {navigate('/subjects/new', {state: {title: 'Create New Subject'}})}}/>
						</Flex>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
};

const Flex = styled.div``;

export default SubjectScreen;