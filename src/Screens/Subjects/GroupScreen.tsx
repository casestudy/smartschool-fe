import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Row , Col, Button, Modal, Spin } from 'antd';

import Header from '../../Components/UI/Header/Header';
import CustomTable from '../../Components/UI/Table/CustomTable';
import AddButton from '../../Components/UI/Button/AddButton';

import 'antd/dist/antd.css';
import styled from 'styled-components';

import PenIcon from '../../Components/UI/Icons/Pen';
import Danger from '../../Components/UI/Icons/Danger';
import PlusIcon from '../../Components/UI/Icons/PlusIcon';
import ThrashIcon from '../../Components/UI/Icons/ThrashIcon';
import VisualizeIcon from '../../Components/UI/Icons/Visualize';

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchGroupsAsync } from '../../State/Thunks/SubjectsThunk';

const GroupScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(true);
	const [originalGroups, setOriginalGroups] = useState([]);
	const [filteredGroups, setFilteredGroups] = useState([]);

	let ll: any = localStorage.getItem('lastlogin');

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const filterTable = (e: any) => {
		const filt = originalGroups.filter((x:any) => x.sname.toLowerCase().includes(e.toLowerCase()) || x.code.toString().includes(e) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredGroups(filt);
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
			dataIndex: 'gname',
			key: 'gname',
			width: '20%',
			sorter: (a: any, b: any) => a.sname.localeCompare(b.sname)
        },
        {
			title: 'Description',
			dataIndex: 'descript',
			key: 'descript',
			width: '60%'
        },
		{
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: '351C75', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						navigate('/groups/new', {
							state: {
								title: 'Modify Subject Group', 
								groupid: row.groupid,
								groupname: row.gname,
								groupdesc: row.descript
							}
						})
					}}>
					<PenIcon color='#351C75' size='18px' line='20px'/> 
				</Button>

				<Button type='text' style={{color: '351C75', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						console.log("Deleting now");
					}}>
					<ThrashIcon color='#351C75'/> 
				</Button>

				<Button type='text' style={{color: '351C75', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						localStorage.setItem("role", JSON.stringify(row));
						navigate('/roles/visualize');
					}}>
					<VisualizeIcon color='#351C75'/> 
				</Button>
			</Flex>
		},
		{
			title: 'Group Id',
			dataIndex: 'groupid',
			key: 'groupid',
			width: '10%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	useEffect(() => {
		const data = {
			connid: localStorage.getItem('connid'),
		};

		dispatch(fetchGroupsAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredGroups(dataSource);
				setOriginalGroups(dataSource);
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
					title: `Subject Groups`,
					content: msg + ' (' + code + ')',
                    okButtonProps: {style: {backgroundColor: '#351C75 !important'}, color: '#351C75 !important'},
					icon: <Danger color='#351C75'/>
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
			<Spin spinning={loading} tip="Fetching subject groups...">
				<Header title='Groups' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<div style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredGroups} searchIconColor='#351C75' rowKey='groupid' filter={filterTable}/>
							<AddButton hint='Create new subject group' icon={<PlusIcon/>} top='-50px' float='right' color='#351C75' onClick={() => {navigate('/groups/new', {state: {title: 'Create New Group'}})}}/>
						</div>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
};

const Flex = styled.div``;

export default GroupScreen;