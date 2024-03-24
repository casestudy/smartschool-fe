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
import VisualizeIcon from '../../Components/UI/Icons/Visualize';

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchAcademicYearAsync } from '../../State/Thunks/CalendarThunk';

const CalendarScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(true);
	const [originalCalendar, setOriginalCalendar] = useState([]);
	const [filteredCalendar, setFilteredCalendar] = useState([]);

	let ll: any = localStorage.getItem('lastlogin');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalCalendar.filter((x:any) => x.startdate.toLowerCase().includes(e.toLowerCase()) || x.enddate.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredCalendar(filt);
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
			title: 'Start Date',
			dataIndex: 'startdate',
			key: 'startdate',
			width: '20%',
			sorter: (a: any, b: any) => a.sdate.localeCompare(b.sdate)
        },
		{
			title: 'End Date',
			dataIndex: 'enddate',
			key: 'enddate',
			width: '20%',
			sorter: (a: any, b: any) => a.edate.localeCompare(b.edate)
        },
		{
			title: 'Description',
			dataIndex: 'descript',
			key: 'descript',
			width: '25%',
			sorter: (a: any, b: any) => a.descript.localeCompare(b.descript)
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/calendar/new', {
							state: {
								title: 'Modify Academic Year', 
								yearid: row.yearid,
								startdate: row.startdate,
								enddate: row.enddate,
								descript: row.descript
							}
						})
					}}>
					<PenIcon color='#D07515' size='18px' line='20px'/> 
				</Button>
				
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/calendar/visualize', {state: {title: row.cname, yearid: row.yearid}});
					}}>
					<VisualizeIcon color='#D07515'/> 
				</Button>
			</Flex>
		},
		{
			title: 'year Id',
			dataIndex: 'yearid',
			key: 'yearid',
			width: '25%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	useEffect(() => {
		const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchAcademicYearAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredCalendar(dataSource);
				setOriginalCalendar(dataSource);
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
					title: `Academic Years`,
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
			<Spin spinning={loading} tip="Fetching academic years...">
				<Header title='Calendar' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<Flex style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredCalendar} searchIconColor='#D07515' rowKey='yearid' filter={filterTable}/>
							<AddButton hint='Create new academic year' icon={<PlusIcon/>} top='-50px' float='right' color='#D07515' onClick={() => {navigate('/calendar/new', {state: {title: 'Create New Academic Year'}})}}/>
						</Flex>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
};

const Flex = styled.div``;

export default CalendarScreen;