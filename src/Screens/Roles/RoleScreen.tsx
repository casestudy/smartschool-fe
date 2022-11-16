import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Row , Col, Button, Modal, Spin } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import VisualizeIcon from '../../Components/UI/Icons/Visualize';
import Danger from '../../Components/UI/Icons/Danger';
import PlusIcon from '../../Components/UI/Icons/PlusIcon';
import ThrashIcon from '../../Components/UI/Icons/ThrashIcon';

import Header from '../../Components/UI/Header/Header';
import CustomTable from '../../Components/UI/Table/CustomTable';
import AddButton from '../../Components/UI/Button/AddButton';

import Title from '../../Components/UI/Messages/Title';
import Message from '../../Components/UI/Messages/Message';

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchRolesAsync, removeRoleAsync } from '../../../src/State/Thunks/RolesThunk';

const { confirm, info } = Modal;

const RoleScreen: React.FC<any> = () => {
	const [loading, setLoading] = useState(true);
	const [originRoles, setOriginRoles] = useState([]);
	const [filteredRoles, setFilteredRoles] = useState([]);

	const navigate = useNavigate();

	const toggle = (checked: boolean) => {
		setLoading(checked);
	};

	let ll: any = localStorage.getItem('lastlogin');

	const dispatch = useAppDispatch();
	const data = {
		connid: localStorage.getItem('connid'),
	};

	const filterTable = (e: any) => {
		const filt = originRoles.filter((x:any) => x.rname.toLowerCase().includes(e.toLowerCase()) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredRoles(filt);
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
			dataIndex: 'rname',
			key: 'rname',
			width: '25%',
			sorter: (a: any, b: any) => a.rname.localeCompare(b.rname)
        },
        {
			title: 'Description',
			dataIndex: 'descript',
			key: 'descript',
			width: '50%'
        },
        {
            title: 'Visualize',
            dataIndex: 'visualize',
            key: 'visualize',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}><Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} onClick={() => {
				localStorage.setItem("role", JSON.stringify(row));
				navigate('/roles/visualize');
			}}><VisualizeIcon/></Button> <Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} onClick = {(() => {
				confirm({
					title: <Title value={'Delete Role'}/>,
					icon: <Danger />,
					width: '600px',
					content: <Message value='Do you really want to delete the role' 
										item={row.rname} msg='All users with this role will no longer be able to perform associated actions.'
										warn='This cannot be undone.'/>,
					okText: 'Yes',
					okType: 'danger',
					okButtonProps:  {style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
					cancelText: 'Cancel',
					cancelButtonProps: {style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
					onOk() {
						toggle(true);
						const data = {
							connid: localStorage.getItem('connid'),
							roleid: row.roleid
						};

						dispatch(removeRoleAsync(data)).then((value) => {
							const result = value.payload ;
							if(result.error === false) {
								// We have the db results here
								const dataSource = result.result.value;
								setFilteredRoles(dataSource);
								setOriginRoles(dataSource);

								toggle(false);

								Modal.success({
									content: 'Role deleted successfully!',
									okType: 'danger',
									okButtonProps:  {style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
								});
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
									title: `Delete role`,
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
					}
					
				})
			})} ><ThrashIcon/></Button></Flex>
        },
		{
			title: 'Role Id',
			dataIndex: 'roleid',
			key: 'roleid',
			width: '15%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	useEffect(() => {
		dispatch(fetchRolesAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredRoles(dataSource);
				setOriginRoles(dataSource);
				toggle(false);
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
					title: `Roles`,
					content: msg + ' (' + code + ')',
					icon: <Danger/>
				});
	
				modal.update({});
				toggle(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	}, [])
	
    
    return (
        <Flex>
			<Spin spinning={loading} tip="Fetching roles...">
				<Header title='Roles' loggedin={true} lastlogin={ll}></Header>
				<Row>
					<Col md={18}>
						<div style={{padding: "5rem 5rem 1px 5rem"}}>
							<CustomTable columns={columns} source={filteredRoles} rowKey='roleid' filter={filterTable}/>
							<AddButton icon={<PlusIcon/>} top='-50px' float='right' onClick={() => {navigate('/roles/new')}}/>
						</div>
					</Col>
					<Col md={6}>Notifications</Col>
				</Row>
			</Spin>
        </Flex>
    );
    
};
const Flex = styled.div``;

export default RoleScreen;
  