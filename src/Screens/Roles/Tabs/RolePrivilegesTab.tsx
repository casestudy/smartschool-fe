import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Button, Spin } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import MinusIcon from '../../../Components/UI/Icons/MinusIcon';
import Danger from '../../../Components/UI/Icons/Danger';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';
import ArrowUpIcon from '../../../Components/UI/Icons/ArrowUp';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import CustomModal from '../../../Components/UI/Modal/Modal';
import AddButton from '../../../Components/UI/Button/AddButton';
import SaveButton from '../../../Components/UI/Button/SaveButton';
import CheckboxField from '../../../Components/UI/Input/CheckBox';

import Title from '../../../Components/UI/Messages/Title';
import Message from '../../../Components/UI/Messages/Message';

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { 
		getRolePermsAsync, 
		deleteRolePermAsync, 
		getPermTypesAsync, 
		addPermToRoleAsync, 
		addPermsToRoleAsync,
		deleteRolePermsAsync 
	} from '../../../../src/State/Thunks/RolesThunk';


const { confirm, info } = Modal;

const RolePrivileges: React.FC<any> = ({}) => {
    const [loading, setLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [modalLoading, setModalLoading] = useState(false);
	const [modalLoadingMessage, setModalLoadingMessage] = useState('');
    const [originRoles, setOriginRoles] = useState([]);
	const [filteredRoles, setFilteredRoles] = useState([]);
	const [isAddPermModalOpen, setIsAddPermModalOpen] = useState(false);
	const [originPerms, setOriginPerms] = useState([]);
	const [filteredPerms, setFilteredPerms] = useState([]);
	const [permsBatch, setPermsBatch] = useState<string[]>([]);

	const handleOkAddPerms = () => {
		const data = {
			connid: localStorage.getItem('connid'),
			roleid: roleDetails.roleid,
			privs: permsBatch
		};

		setModalLoading(true);
		setModalLoadingMessage('Adding selected permissions to role...');
		dispatch(addPermsToRoleAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredRoles(dataSource);
				setOriginRoles(dataSource);

				setModalLoading(false);

				Modal.success({
					content: 'Permissions added to role successfully!',
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
					title: `Add permissions to role`,
					content: msg + ' (' + code + ')',
					icon: <Danger/>
				});
	
				modal.update({});
				setModalLoading(false);
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	};

	const handleCancelAddPerm = () => {
		setIsAddPermModalOpen(false);
		setPermsBatch([]);
	};

	const handleOnCloseAddPermModal= () => {
		setPermsBatch([]);
	};

    const role: any = localStorage.getItem("role");
    const roleDetails = JSON.parse(role);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const data = {
		connid: localStorage.getItem('connid'),
        roleid: roleDetails.roleid
	};

    const filterTable = (e: any) => {
		const filt = originRoles.filter((x:any) => x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredRoles(filt);
	};

	const filterPermTable = (e: any) => {
		const filt = originPerms.filter((x:any) => x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredPerms(filt);
	};

	const addPrivColumns = [
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
			title: 'Add',
			dataIndex: 'add',
			key: 'add',
			width: '5%',
			render: (text:any,row:any, index: any) => <Flex style={{display: 'flex', alignItems: 'center'}}><Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} onClick={() => {
				const data = {
					connid: localStorage.getItem('connid'),
					roleid: roleDetails.roleid,
					priv: row.mode
				};
				
				dispatch(addPermToRoleAsync(data)).then((value) => {
					const result = value.payload ;
					if(result.error === false) {
						// We have the db results here
						setFilteredPerms(filteredPerms.filter((x:any) => x.mode !== row.mode));

						const dataSource = result.result.value;
						setFilteredRoles(dataSource);
						setOriginRoles(dataSource);

						setLoading(false);

						Modal.success({
							content: 'Permission added to role successfully!',
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
							title: `Add permission to role`,
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
			}}><ArrowUpIcon/></Button> <CheckboxField onChange={(e:any) => {
				
				if(e.target.checked) {
					setPermsBatch(perm => [...perm, row.mode]);
				} else {
					permsBatch.splice(permsBatch.indexOf(row.mode),1)
				}
			}}/></Flex>
		},
		{
			title: 'Mode',
			dataIndex: 'mode',
			key: 'mode',
			width: '15%',
			hidden: true
		},
	].filter(item => !item.hidden);;

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
            title: 'Remove',
            dataIndex: 'remove',
            key: 'remove',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}> <Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} onClick={() => {
				
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
            }}><ThrashIcon/></Button> <CheckboxField onChange={(e:any) => {
				//add selected priv to delete to perms batch for removal		
				if(e.target.checked) {
					setPermsBatch(perm => [...perm, row.mode]);
				} else {
					permsBatch.splice(permsBatch.indexOf(row.mode),1)
				}
			}}/> </Flex>
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
		setLoadingMessage('Fetching role privileges...');
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
                <Spin spinning={loading} tip={loadingMessage}>
                    <CustomTable 
						columns={columns} 
						source={filteredRoles} 
						rowKey='mode' 
						filter={filterTable}
					/>
					<Flex style={{marginTop: '-50px', float:'right', display: 'flex'}}>
						<Flex style={{paddingRight: '15px'}}><AddButton icon={<MinusIcon/>} hint='Remove selected privileges from role' onClick={() => {
							const role: any = localStorage.getItem('role');
							const name = JSON.parse(role) .rname;

							if(permsBatch.length > 0) {
								confirm({
									title: <Title value={'Remove selected privileges from role: ' + name}/>,
									icon: <Danger/>,
									width: '600px',
									content: <Message value='Do you really want to remove the selected privileges?' 
												msg='All users with this role will no longer be able to perform these specific actions.'
												warn='This cannot be undone.'/>,
									okText: 'Yes',
									okType: 'danger',
									okButtonProps:  {style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
									cancelText: 'Cancel',
									cancelButtonProps: {style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
									onOk() {
										setLoading(true);
										setLoadingMessage('Removing selected privileges...');

										const data = {
											connid: localStorage.getItem('connid'),
											roleid: roleDetails.roleid,
											privs: permsBatch
										};

										dispatch(deleteRolePermsAsync(data)).then((value) => {
											const result = value.payload ;
											if(result.error === false) {
												// We have the db results here
												const dataSource = result.result.value;
												setFilteredRoles(dataSource);
												setOriginRoles(dataSource);
				
												setLoading(false);
				
												Modal.success({
													content: 'Permissions removed from role successfully!',
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
									}
								});
							} else {
								info({
									title: <Title value={'Remove privileges from role: ' + name}/>,
									content: 'First select some privileges to be removed',
									okType: 'danger',
									okButtonProps:  {style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
								});
							}
							
						}} /> </Flex>
						<AddButton icon={<PlusIcon/>} hint='Add privileges to role' onClick={() => {
							setPermsBatch([]); //Reset the perm bactch to initial state
							setIsAddPermModalOpen(true);
							const data = {
								connid: localStorage.getItem('connid')
							};
							
							setModalLoading(true);
							setModalLoadingMessage('Fetching all privileges...');
							dispatch(getPermTypesAsync(data)).then((value) => {
								const result = value.payload ;
								if(result.error === false) {
									// We have the db results here
									let dataSource = result.result.value;
									
									//We have to filter before display to remove roles there already have

									for (let i = 0; i < filteredRoles.length; i++) {
										const element: any = filteredRoles[i];
										dataSource = dataSource.filter((x:any) => x.mode !== element.mode) ;
									}
									
									setFilteredPerms(dataSource);
									setOriginPerms(dataSource);
									setModalLoading(false);
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
										title: `Get all permissions`,
										content: msg + ' (' + code + ')',
										icon: <Danger/>
									});
						
									modal.update({});
									setModalLoading(false);
								}
							},(error) => {
								console.log("Error");
								console.log(error);
							} );
						}}/>

					</Flex>

					<CustomModal visible={isAddPermModalOpen} title='All Privileges' 
								okText='Add selected privileges' onOk={handleOkAddPerms} onCancel={handleCancelAddPerm} 
								columns={addPrivColumns} source={filteredPerms} tableKey='mode' onFilter={filterPermTable} onClose={handleOnCloseAddPermModal}
								okDisabled={permsBatch.length > 0? false : true} spin={modalLoading} spinMessage={modalLoadingMessage} />
                </Spin>
                
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default RolePrivileges;