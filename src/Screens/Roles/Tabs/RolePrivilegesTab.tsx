import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Button, Spin } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import Danger from '../../../Components/UI/Icons/Danger';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';

import Title from '../../../Components/UI/Messages/Title';
import Message from '../../../Components/UI/Messages/Message';

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { getRolePermsAsync, deleteRolePermAsync } from '../../../../src/State/Thunks/RolesThunk';

const { confirm } = Modal;

const RolePrivileges: React.FC<any> = ({}) => {
    const [loading, setLoading] = useState(true);
    const [originRoles, setOriginRoles] = useState([]);
	const [filteredRoles, setFilteredRoles] = useState([]);
	const [currentRoleName, setCurrentRoleName] = useState('');
    const [currentRoleDescription, setCurrentRoleDescription] = useState('');

    const role: any = localStorage.getItem("role");
    const roleDetails = JSON.parse(role);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const confirmDeleteRole = () => {
        console.log(currentRoleDescription);
        
		confirm({
			title: 'Remove privilege from role: ' + currentRoleName,
			icon: <Danger />,
			content: 'Do you really want to remove the privilege: ' + currentRoleDescription + '?',
			onOk() {
			  console.log('OK');
			},
			onCancel() {
			  console.log('Cancel');
			},
		});
    }

    const data = {
		connid: localStorage.getItem('connid'),
        roleid: roleDetails.roleid
	};

    const filterTable = (e: any) => {
		const filt = originRoles.filter((x:any) => x.descript.toLowerCase().includes(e.toLowerCase()));
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
			hidden: true
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
			render: (text:any,row:any) => <Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} onClick={() => {
				
				confirm({
					title: <Title value={'Remove privilege from role: ' + row.rname}/>,
					icon: <Danger />,
					width: '600px',
					content: <Message value='Do you really want to remove the privilege' 
										item={row.descript} msg='All users with this role will no longer be able to perform this specific action.'
										warn='This cannot be undone.'/>,
					okText: 'Yes',
					okType: 'danger',
					okButtonProps:  {style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
					cancelText: 'Cancel',
					cancelButtonProps: {style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
					onOk() {
						setLoading(true);
						const data = {
							connid: localStorage.getItem('connid'),
							roleid: roleDetails.roleid,
							priv: row.mode
						};

						dispatch(deleteRolePermAsync(data)).then((value) => {
							const result = value.payload ;
							if(result.error === false) {
								// We have the db results here
								const dataSource = result.result.value;
								setFilteredRoles(dataSource);
								setOriginRoles(dataSource);
								setLoading(false);

								Modal.success({
									content: 'Permission removed from role successfully!',
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
									title: `Delete permission`,
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
					},
					onCancel() {
					  console.log('Cancel');
					},
				});
            }}><ThrashIcon/></Button>
        },
		{
			title: 'Mode',
			dataIndex: 'mode',
			key: 'mode',
			width: '15%',
			hidden: true
		},
    ].filter(item => !item.hidden);

    useEffect(() => {        
        dispatch(getRolePermsAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredRoles(dataSource);
				setOriginRoles(dataSource);
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
					title: `Role Permissions`,
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
    },[])

    return (
        <>
            <Flex>
                <Spin spinning={loading} tip="Fetching role privileges...">
                    <CustomTable columns={columns} source={filteredRoles} rowKey='mode' filter={filterTable}/>
                    <AddButton icon={<PlusIcon/>} top='-50px' float='right' onClick={() => {navigate('/roles/new')}}/>
                </Spin>
                
            </Flex>
		</>
    );
};

const Flex = styled.div``;



export default RolePrivileges;