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

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchUsersAsync } from '../../State/Thunks/UsersThunks';

const TeacherScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(true);
	const [originalAdministrators, setOriginalAdministrators] = useState([]);
	const [filteredAdministrators, setFilteredAdministrators] = useState([]);

	let ll: any = localStorage.getItem('lastlogin');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalAdministrators.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredAdministrators(filt);
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
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			width: '13%',
			sorter: (a: any, b: any) => a.username.localeCompare(b.username)
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
			width: '18%',
			sorter: (a: any, b: any) => a.othernames.localeCompare(b.othernames)
        },
        {
			title: 'Email address',
			dataIndex: 'emailaddress',
			key: 'emailaddress',
			width: '14%'
        },
        {
			title: 'Phone number',
			dataIndex: 'phonenumber',
			key: 'phonenumber',
			width: '14%'
        },
        {
			title: 'Gender',
			dataIndex: 'gender',
			key: 'gender',
			width: '4%',
            render: (text: any, row:any) => <Flex>
                {row.gender? <MaleIcon/> : <FemaleIcon/>}
            </Flex>
        },
        {
			title: 'DOB',
			dataIndex: 'dob',
			key: 'dob',
			width: '12%'
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/user/new', {
							state: {
								title: 'Modify Administrator', 
								userid: row.userid,
								usertype: 'administrator',
								username: row.username,
								surname: row.surname,
								othernames: row.othernames,
								emailaddress: row.emailaddress,
								phonenumber: row.phonenumber,
								gender: row.gender,
								dob: row.dob,
								onidle: row.onidle,
								locale: row.locale,
                                position: row.position
							}
						})
					}}>
					<PenIcon color={Color.administrators} size='18px' line='20px'/> 
				</Button>

				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						//localStorage.setItem("role", JSON.stringify(row));
						navigate('/user/visualize', {state: {usertype: 'administrator', row: row}});
					}}>
					<VisualizeIcon color = {Color.administrators}/> 
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
			title: 'On Idle',
			dataIndex: 'onidle',
			key: 'onidle',
			width: '1%',
			hidden: true
		},
		{
			title: 'Locale',
			dataIndex: 'locale',
			key: 'locale',
			width: '1%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	useEffect(() => {
        const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			connid: localStorage.getItem('connid'),
            utype: 'administrator',
            locale: locale
		};

		dispatch(fetchUsersAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredAdministrators(dataSource);
				setOriginalAdministrators(dataSource);
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
					title: `Teachers`,
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.administrators}/>
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
			<Spin spinning={loading} tip="Fetching administrators...">
				<Header title='Administrators' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<Flex style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredAdministrators} searchIconColor={Color.administrators} rowKey='userid' filter={filterTable}/>
							<AddButton hint='Create new administrator' icon={<PlusIcon/>} top='-50px' float='right' color={Color.administrators} onClick={() => {navigate('/user/new', {state: {title: 'Create New Administrator', usertype: 'administrator'}})}}/>
						</Flex>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
};

const Flex = styled.div``;

export default TeacherScreen;