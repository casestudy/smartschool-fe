import  React, { useEffect, useState } from 'react';

import { Modal, Button, Spin } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import Title from '../../../Components/UI/Messages/Title';
import Message from '../../../Components/UI/Messages/Message';

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import MinusIcon from '../../../Components/UI/Icons/MinusIcon';
import Danger from '../../../Components/UI/Icons/Danger';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';
import ArrowUpIcon from '../../../Components/UI/Icons/ArrowUp';

import AddButton from '../../../Components/UI/Button/AddButton';
import CustomTable from '../../../Components/UI/Table/CustomTable';
import CustomModal from '../../../Components/UI/Modal/Modal';
import CheckboxField from '../../../Components/UI/Input/CheckBox';

import { useAppDispatch } from '../../../State/Hooks';

import { 
	getRoleSubRolesAsync,
	fetchRolesAsync,
	addRoleToRoleAsync,
	addRolesToRoleAsync,
	removeRoleFromRoleAsync,
	removeRolesFromRoleAsync
} from '../../../../src/State/Thunks/RolesThunk';

const { confirm, info } = Modal;

const RoleSubRoles: React.FC<any> = ({}) => {
    const [loading, setLoading] = useState(true);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [modalLoading, setModalLoading] = useState(false);
	const [modalLoadingMessage, setModalLoadingMessage] = useState('');
	const [subRolesBatch, setSubRolesBatch] = useState<string[]>([]);
	const [filteredSubRoles, setFilteredSubRoles] = useState([]);
	const [originSubRoles, setOriginSubRoles] = useState([]);
	const [filteredRoles, setFilteredRoles] = useState([]); //For all roles table
	const [originalRoles, setOriginalRoles] = useState([]); //For all roles table
	const [isAddSubRoleModalOpen, setIsAddSubModalOpen] = useState(false);
	const [filterSubRolesTable, setFilterSubRolesTable] = useState([]);

	const role: any = localStorage.getItem("role");
    const roleDetails = JSON.parse(role);

    const dispatch = useAppDispatch();

	// Methods start
	const filterTable = (e: any) => {
		const filt = originSubRoles.filter((x:any) => x.rname.toLowerCase().includes(e.toLowerCase()) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredSubRoles(filt);
	};

	const handleCancelAddSubRoles = () => {
		setIsAddSubModalOpen(false);
		setSubRolesBatch([]);
	};

	const handleOkAddSubRoles = () => {
		console.log(subRolesBatch);
		const data = {
			connid: localStorage.getItem('connid'),
			owner: roleDetails.roleid,
			targets: subRolesBatch,
			locale: localStorage.getItem('locale')
		};

		setModalLoading(true);
		setModalLoadingMessage('Adding roles to role...');

		dispatch(addRolesToRoleAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				let filt = filteredRoles;
				for (let i = 0; i < subRolesBatch.length; i++) {
					const element = subRolesBatch[i];
					
					filt = filt.filter((x:any) => x.roleid !== element) ;
				}

				setFilteredRoles(filt);

				const dataSource = result.result.value;
				setFilteredSubRoles(dataSource);
				setOriginSubRoles(dataSource);

				setModalLoading(false);

				Modal.success({
					content: 'Roles added to role successfully!',
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
					title: `Add roles to role`,
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

	const handleOnCloseAddSubRolesModal= () => {
		setSubRolesBatch([]);
	};

	const filterRolesTable = (e: any) => {
		const filt = originalRoles.filter((x:any) => x.rname.toLowerCase().includes(e.toLowerCase()) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredRoles(filt);
	};

	// Methods end

	// Columns definition start
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
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						confirm({
							title: <Title value={'Remove role from role: ' + row.rname}/>,
							icon: <Danger />,
							width: '600px',
							content: <Message value='Do you really want to remove the sub role' 
												item={row.rname} msg='Users will no longer be able to perform actions associated with this role.'
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
									owner: roleDetails.roleid,
									target: row.roleid
								};
		
								dispatch(removeRoleFromRoleAsync(data)).then((value) => {
									const result = value.payload ;
									if(result.error === false) {
										setFilteredSubRoles(filteredSubRoles.filter((x:any) => x.roleid !== row.roleid));

										// We have the db results here
										const dataSource = result.result.value;
										setFilteredRoles(dataSource);
										setOriginalRoles(dataSource);
		
										setLoading(false);
		
										Modal.success({
											content: 'Role removed from role successfully!',
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
											title: `Remove role from, role`,
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
					}}>
					<ThrashIcon/>
				</Button>
				<CheckboxField onChange={(e:any) => {
					if(e.target.checked) {
						setSubRolesBatch(perm => [...perm, row.roleid]);
					} else {
						subRolesBatch.splice(subRolesBatch.indexOf(row.roleid),1)
					}
				}}/>
			</Flex>
        },
		{
			title: 'Role Id',
			dataIndex: 'roleid',
			key: 'roleid',
			width: '15%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	const addSubRolesColumns = [
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
            title: 'Add',
            dataIndex: 'add',
            key: 'add',
            width: '5%',
			render: (text:any,row:any, index: any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: '#BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						const data = {
							connid: localStorage.getItem('connid'),
							owner: roleDetails.roleid,
							target: row.roleid,
							locale: localStorage.getItem('locale')
						};

						setModalLoading(true);
						setModalLoadingMessage('Adding role to role...');
						dispatch(addRoleToRoleAsync(data)).then((value) => {
							const result = value.payload ;
							if(result.error === false) {
								// We have the db results here
								setFilteredRoles(filteredRoles.filter((x:any) => x.roleid !== row.roleid));
		
								const dataSource = result.result.value;
								setFilteredSubRoles(dataSource);
								setOriginSubRoles(dataSource);
		
								setModalLoading(false);
		
								Modal.success({
									content: 'Role added to role successfully!',
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
									title: `Add role to role`,
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
					}}>
					<ArrowUpIcon/>
				</Button>
				<CheckboxField onChange={(e:any) => {
				
					if(e.target.checked) {
						setSubRolesBatch(perm => [...perm, row.roleid]);
					} else {
						subRolesBatch.splice(subRolesBatch.indexOf(row.roleid),1)
					}
				}}/>
			</Flex>
        },
		{
			title: 'Role Id',
			dataIndex: 'roleid',
			key: 'roleid',
			width: '15%',
			hidden: true
		},
    ].filter(item => !item.hidden);
	// Column definitiomn ends

	const data = {
		connid: localStorage.getItem('connid'),
        roleid: roleDetails.roleid
	};

	useEffect(() => {        
		setLoadingMessage('Fetching role sub roles...');
        dispatch(getRoleSubRolesAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;

				setFilteredSubRoles(dataSource);
				setOriginSubRoles(dataSource);
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
					title: `Role Sub roles`,
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
						source={filteredSubRoles} 
						rowKey='roleid' 
						filter={filterTable}
					/>
					<Flex style={{marginTop: '-50px', float:'right', display: 'flex'}}>
						<Flex style={{paddingRight: '15px'}}>
							<AddButton icon={<MinusIcon/>} hint='Remove selected roles from role' onClick={() => {
								const role: any = localStorage.getItem('role');
								const name = JSON.parse(role) .rname;

								if(subRolesBatch.length > 0) {

									confirm({
										title: <Title value={'Remove roles from role: ' + name}/>,
										icon: <Danger />,
										width: '600px',
										content: <Message value='Do you really want to remove the selected sub roles?' 
															item='' msg='Users will no longer be able to perform actions associated with this role.'
															warn='This cannot be undone.'/>,
										okText: 'Yes',
										okType: 'danger',
										okButtonProps:  {style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
										cancelText: 'Cancel',
										cancelButtonProps: {style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
										onOk() {										
											const data = {
												connid: localStorage.getItem('connid'),
												owner: roleDetails.roleid,
												targets: subRolesBatch
											};

											dispatch(removeRolesFromRoleAsync(data)).then((value) => {
												const result = value.payload ;
												if(result.error === false) {
			
													// We have the db results here
													const dataSource = result.result.value;
													setFilteredSubRoles(dataSource);
													setOriginSubRoles(dataSource);
					
													setLoading(false);
					
													Modal.success({
														content: 'Roles removed from role successfully!',
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
														title: `Remove roles from role`,
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
								} else {
									info({
										title: <Title value={'Remove roles from role: ' + name}/>,
										content: 'First select some roles to be removed',
										okType: 'danger',
										okButtonProps:  {style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
									});
								}

								
							}}/>
						</Flex>
						<AddButton icon={<PlusIcon/>} hint='Add roles to role' onClick={() => {
							setSubRolesBatch([]); //Reset the perm bactch to initial state
							setIsAddSubModalOpen(true);

							const data = {
								connid: localStorage.getItem('connid')
							};
							
							setModalLoading(true);
							setModalLoadingMessage('Fetching all roles...');

							dispatch(fetchRolesAsync(data)).then((value) => {
								const result = value.payload ;
								if(result.error === false) {
									// We have the db results here
									let dataSource = result.result.value;
									
									//We have to filter before display to remove roles there already have

									for (let i = 0; i < filteredSubRoles.length; i++) {
										const element: any = filteredSubRoles[i];
										dataSource = dataSource.filter((x:any) => x.roleid !== element.roleid) ;
									}
									
									setFilteredRoles(dataSource);
									setOriginalRoles(dataSource);
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
										title: `Get all roles`,
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
				</Spin>

				<CustomModal visible={isAddSubRoleModalOpen} title='All roles' 
								okText='Add selected roles' onOk={handleOkAddSubRoles} onCancel={handleCancelAddSubRoles} 
								columns={addSubRolesColumns} source={filteredRoles} tableKey='roleid' onFilter={filterRolesTable} onClose={handleOnCloseAddSubRolesModal}
								okDisabled={subRolesBatch.length > 0? false : true} spin={modalLoading} spinMessage={modalLoadingMessage} />
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default RoleSubRoles;