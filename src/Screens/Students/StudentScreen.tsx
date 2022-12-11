import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Row , Col, Button, Modal, Spin } from 'antd';

import Header from '../../Components/UI/Header/Header';
import CustomTable from '../../Components/UI/Table/CustomTable';
import AddButton from '../../Components/UI/Button/AddButton';

import styled from 'styled-components';
import 'antd/dist/antd.css';
import { decode as base64_decode} from 'base-64';

import Color from '../../Components/UI/Header/Theme.json';

import PenIcon from '../../Components/UI/Icons/Pen';
import Danger from '../../Components/UI/Icons/Danger';
import PlusIcon from '../../Components/UI/Icons/PlusIcon';
import MaleIcon from '../../Components/UI/Icons/Male';
import FemaleIcon from '../../Components/UI/Icons/Female';
import VisualizeIcon from '../../Components/UI/Icons/Visualize';

import { useAppDispatch } from '../../State/Hooks';
import { fetchStudentsAsync } from '../../State/Thunks/StudentsThunks';

const StudentScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(false);
	const [originalStudents, setOriginalStudents] = useState([]);
	const [filteredStudents, setFilteredStudents] = useState([]);

	let ll: any = localStorage.getItem('lastlogin');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalStudents.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredStudents(filt);
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
			width: '17%',
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
			title: 'Matricule',
			dataIndex: 'matricule',
			key: 'matricule',
			width: '10%'
        },
        {
			title: 'Gender',
			dataIndex: 'gender',
			key: 'gender',
			width: '5%',
            render: (text: any, row:any) => <Flex>
                {row.gender? <MaleIcon/> : <FemaleIcon/>}
            </Flex>
        },
        {
			title: 'DOB',
			dataIndex: 'dob',
			key: 'dob',
			width: '11%'
        },
        {
			title: 'DOE',
			dataIndex: 'doe',
			key: 'doe',
			width: '11%'
        },
        {
			title: 'Class',
			dataIndex: 'cabbrev',
			key: 'class',
			width: '10%',
			sorter: (a: any, b: any) => a.class.localeCompare(b.class)
        },
        {
			title: 'Status',
			dataIndex: 'descript',
			key: 'status',
			width: '12%',
			sorter: (a: any, b: any) => a.status.localeCompare(b.status)
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/student/new', {
							state: {
								title: 'Modify Student', 
								userid: row.userid,
								username: row.username,
								surname: row.surname,
								othernames: row.othernames,
								gender: row.gender,
								dob: row.dob,
								pob: row.pob,
								matricule: row.matricule,
								classid: row.classid
							}
						})
					}}>
					<PenIcon color={Color.students} size='18px' line='20px'/> 
				</Button>

				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						//localStorage.setItem("role", JSON.stringify(row));
						navigate('/user/visualize', {state: {usertype: 'teacher', row: row}});
					}}>
					<VisualizeIcon color = {Color.students}/> 
				</Button>
			</Flex>
		},
		{
			title: 'User Id',
			dataIndex: 'userid',
			key: 'userid',
			width: '1%',
			hidden: true
		},
		{
			title: 'Class Id',
			dataIndex: 'classid',
			key: 'classid',
			width: '1%',
			hidden: true
		}
    ].filter(item => !item.hidden);

	useEffect(() => {
        const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			connid: localStorage.getItem('connid'),
			locale: locale
		};

		dispatch(fetchStudentsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredStudents(dataSource);
				setOriginalStudents(dataSource);
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
					title: `Students`,
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
	}, [])

    return (
        <Flex>
			<Spin spinning={loading} tip="Fetching students...">
				<Header title='Students' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<Flex style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredStudents} searchIconColor={Color.students} rowKey='userid' filter={filterTable}/>
							<AddButton hint='Create new student' icon={<PlusIcon/>} top='-50px' float='right' color={Color.students} onClick={() => {navigate('/student/new', {state: {title: 'Create New Student'}})}}/>
						</Flex>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
};

const Flex = styled.div``;

export default StudentScreen;