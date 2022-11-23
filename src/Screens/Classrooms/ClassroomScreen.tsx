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
import VisualizeIcon from '../../Components/UI/Icons/Visualize';

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchClassroomsAsync } from '../../State/Thunks/ClassroomsThunk';

const ClassroomScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(true);
	const [originalClassrooms, setOriginalClassrooms] = useState([]);
	const [filteredClassrooms, setFilteredClassrooms] = useState([]);

	let ll: any = localStorage.getItem('lastlogin');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalClassrooms.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredClassrooms(filt);
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
			title: 'Name',
			dataIndex: 'cname',
			key: 'cname',
			width: '10%',
			sorter: (a: any, b: any) => a.cname.localeCompare(b.cname)
        },
		{
			title: 'Abbreviation',
			dataIndex: 'abbreviation',
			key: 'abbreviation',
			width: '5%',
			sorter: (a: any, b: any) => a.abbreviation.localeCompare(b.abbreviation)
        },
		{
			title: 'Description',
			dataIndex: 'descript',
			key: 'descript',
			width: '25%',
			sorter: (a: any, b: any) => a.descript.localeCompare(b.descript)
        },
        {
			title: 'Class master',
			dataIndex: 'classmaster',
			key: 'classmaster',
			width: '15%'
        },
        {
			title: 'Class head',
			dataIndex: 'classhead',
			key: 'classhead',
			width: '15%'
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/classrooms/new', {
							state: {
								title: 'Modify Classroom', 
								classroomid: row.classid,
								classroomname: row.cname,
								classroomabbrev: row.abbreviation,
								classroomdesc: row.descript
							}
						})
					}}>
					<PenIcon color='#D07515' size='18px' line='20px'/> 
				</Button>
				
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/classroom/visualize', {state: {title: row.cname, classid: row.classid}});
					}}>
					<VisualizeIcon color='#D07515'/> 
				</Button>
			</Flex>
		},
		{
			title: 'Class Id',
			dataIndex: 'classid',
			key: 'classid',
			width: '25%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	useEffect(() => {
		const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchClassroomsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredClassrooms(dataSource);
				setOriginalClassrooms(dataSource);
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
	}, [])

    return (
        <Flex>
			<Spin spinning={loading} tip="Fetching classrooms...">
				<Header title='Classrooms' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<Flex style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredClassrooms} searchIconColor='#D07515' rowKey='classid' filter={filterTable}/>
							<AddButton hint='Create new classrooms' icon={<PlusIcon/>} top='-50px' float='right' color='#D07515' onClick={() => {navigate('/classrooms/new', {state: {title: 'Create New Classroom'}})}}/>
						</Flex>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
};

const Flex = styled.div``;

export default ClassroomScreen;