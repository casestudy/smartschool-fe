import React, { useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Row , Col, Button, Modal, Spin } from 'antd';

import Header from '../../Components/UI/Header/Header';
import CustomTable from '../../Components/UI/Table/CustomTable';
import AddButton from '../../Components/UI/Button/AddButton';

import BackButton from '../../Components/UI/Button/BackButton';
import BackIcon from '../../Components/UI/Icons/BackArrow';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import PenIcon from '../../Components/UI/Icons/Pen';
import Danger from '../../Components/UI/Icons/Danger';
import PlusIcon from '../../Components/UI/Icons/PlusIcon';
import VisualizeIcon from '../../Components/UI/Icons/Visualize';

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchAcademicTermAsync } from '../../State/Thunks/CalendarThunk';

const AcademicTermScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(true);
	const [originalCalendar, setOriginalCalendar] = useState([]);
	const [filteredCalendar, setFilteredCalendar] = useState([]);

	let ll: any = localStorage.getItem('lastlogin');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalCalendar.filter((x:any) => x.startdate.toLowerCase().includes(e.toLowerCase()) || x.enddate.toString().includes(e));
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
			title: 'Type',
			dataIndex: 'descript',
			key: 'descript',
			width: '25%',
			sorter: (a: any, b: any) => a.descript.localeCompare(b.descript)
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
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/calendar/terms/new', {
							state: {
								title: 'Modify Academic Term', 
								yearid: row.yearid, 
								termid: row.termid,
								startdate: row.startdate,
								enddate: row.enddate,
								descript: row.descript,
								ttype: row.termtype,
							}
						})
					}}>
					<PenIcon color='#D07515' size='18px' line='20px'/> 
				</Button>
				
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/calendar/terms/visualize', {state: {termid: row.termid, yearid: row.yearid}});
					}}>
					<VisualizeIcon color='#D07515'/> 
				</Button>
			</Flex>
		},
		{
			title: 'year Id',
			dataIndex: 'yearid',
			key: 'yearid',
			width: '15%',
			hidden: true
		},
        {
			title: 'Term Id',
			dataIndex: 'termid',
			key: 'termid',
			width: '5%',
			hidden: true
		},
		{
			title: 'Term type',
			dataIndex: 'termtype',
			key: 'termtype',
			width: '5%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	const { state } = useLocation();

	useEffect(() => {
		const data = {
			connid: localStorage.getItem('connid'),
			yearid: state.yearid,
		};

		dispatch(fetchAcademicTermAsync(data)).then((value) => {
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
					title: `Academic terms`,
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
			<Spin spinning={loading} tip="Fetching academic terms...">
				<Header title='Calendar' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<Flex style={{padding: "5rem 5rem 1px 5rem", fontWeight: 700, fontSize: "1.2rem", alignItems: "center", marginBottom: 0, display: "flex"}}>
							<BackArrow>
								<BackButton icon={<BackIcon/>} onClick={() => {navigate('/calendar')}}/>
							</BackArrow>
							<Flex style={{columnGap: '1rem', display: 'flex'}}>
								<Title>Academic Terms</Title>
							</Flex>
						</Flex>
						<Flex style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredCalendar} searchIconColor='#D07515' rowKey='termid' filter={filterTable}/>
							<AddButton hint='Create new academic term' icon={<PlusIcon/>} top='-50px' float='right' color='#D07515' onClick={() => {navigate('/calendar/terms/new', {state: {title: 'Create New Academic Term', yearid: state.yearid}})}}/>
						</Flex>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
};

const Flex = styled.div``;
const BackArrow = styled.div`
    width: 5%;
    & button {
        background: transparent !important;
        border: none
    }
`;
const Title = styled.div`
	font-size: 1.125rem;
	font-weight: 800;
	text-transform: uppercase;
`;

export default AcademicTermScreen;