import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Spin } from 'antd';
import { decode as base64_decode} from 'base-64';

import styled from 'styled-components';
import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';
import CustomModal from '../../../Components/UI/Modal/Modal';
import Color from '../../../Components/UI/Header/Theme.json';

import Danger from '../../../Components/UI/Icons/Danger';
import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import MaleIcon from '../../../Components/UI/Icons/Male';
import FemaleIcon from '../../../Components/UI/Icons/Female';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';
import ArrowUpIcon from '../../../Components/UI/Icons/ArrowUp';

import { useAppDispatch } from '../../../State/Hooks';
import { fetchStudentParentsAsync, removeStudentParentAsync, addStudentParentAsync } from '../../../State/Thunks/StudentsThunks';
import { fetchUsersAsync } from '../../../State/Thunks/UsersThunks';

import Title from '../../../Components/UI/Messages/Title';
import Message from '../../../Components/UI/Messages/Message';

const { confirm, info } = Modal;

interface Prop {
	userid?: number,
	userfullname?: string,
}

const StudentParents: React.FC<Prop> = ({userid, userfullname}) => {
	const [loading, setLoading] = useState(false);
	const [loadingMessage, setLoadingMessage] = useState('');
	const [filteredParents, setFilteredParents] = useState([]);
	const [originalParents, setOriginalParents] = useState([]);

	const [filteredAllParents, setFilteredAllParents] = useState([]);
	const [originalAllParents, setOriginalAllParents] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [modalSpin, setModalSpin] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// Methods start
	const filterTable = (e: any) => {
		const filt = originalParents.filter((x:any) => x.surname.toLowerCase().includes(e.toLowerCase()) || x.othernames.toLowerCase().includes(e.toLowerCase()));
		setFilteredParents(filt);
	};

	const filterStudentParentsTable = (e: any) => {
		const filt = originalAllParents.filter((x:any) => x.surname.toLowerCase().includes(e.toLowerCase()) || x.othernames.toLowerCase().includes(e.toLowerCase()));
		setFilteredAllParents(filt);
	};

	const handleOkAddParents = () => {}

	const handleCancelAddParents = () => {
		setModalVisible(false);
	}

	const fetchAllParents = () => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			connid: localStorage.getItem('connid'),
            utype: 'parent',
			locale: locale
		};

		dispatch(fetchUsersAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;

				setFilteredAllParents(dataSource);
				setOriginalAllParents(dataSource);
				setLoading(false);
				setModalVisible(true)
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
					title: `Parents`,
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
	}

    useEffect(() => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

        const data = {
			connid: localStorage.getItem('connid'),
            userid: userid,
			locale: locale
		};

		dispatch(fetchStudentParentsAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				let dataSource = result.result.value;

				for (let i = 0; i < filteredParents.length; i++) {
					const element: any = filteredParents[i];
					dataSource = dataSource.filter((x:any) => x.mode !== element.mode) ;
				}

				setFilteredParents(dataSource);
				setOriginalParents(dataSource);
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
					title: 'Students',
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
        
    },[])

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
			title: 'Surname',
			dataIndex: 'surname',
			key: 'surname',
			width: '15%',
			sorter: (a: any, b: any) => a.rname.localeCompare(b.surname)
        },
        {
			title: 'Othernames',
			dataIndex: 'othernames',
			key: 'othernames',
			width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'emailaddress',
            key: 'emailaddress',
            width: '15%'
		},
		{
            title: 'Phone',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
            width: '15%'
		},
		{
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: '10%',
			render: (text: any, row:any) => <Flex>
                {row.gender? <MaleIcon/> : <FemaleIcon/>}
            </Flex>
		},
		{
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: '15%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}>
				<Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} 
					onClick={() => {
						//Either delete of parent or adding a parent
						if(modalVisible) {
							setLoading(true);
							setLoadingMessage('Adding parent to student...');

							const b64 : any = localStorage.getItem('data');
							const store : any = base64_decode(b64) ;
							const locale = JSON.parse(store).result.value[0][0].locale;

							const data = {
								connid: localStorage.getItem('connid'),
								locale: locale,
								studentid: userid,
								parentid: row.userid
							};

							dispatch(addStudentParentAsync(data)).then((value) => {
								const result = value.payload ;
								if(result.error === false) {
									// We have the db results here
									setFilteredAllParents(filteredAllParents.filter((x:any) => x.userid !== row.userid));

									const dataSource = result.result.value;
									setFilteredParents(dataSource);
									setOriginalParents(dataSource);
	
									setLoading(false);
	
									Modal.success({
										content: 'Parent added to student successfully!',
										okType: 'danger',
										okButtonProps:  {style: {backgroundColor: Color.students, borderColor: Color.students, borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
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
										title: `Add student parent`,
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
						} else {
							confirm({
								title: <Title value={'Remove parent from student: ' + userfullname}/>,
								icon: <Danger color={Color.students}/>,
								width: '600px',
								content: <Message value='Do you really want to remove this parent from this student?' 
											msg=''
											warn='This cannot be undone.'/>,
								okText: 'Yes',
								okType: 'danger',
								okButtonProps:  {style: {backgroundColor: Color.students, borderColor: Color.students, borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
								cancelText: 'Cancel',
								cancelButtonProps: {style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
								onOk() {
									setLoading(true);
									setLoadingMessage('Removing parent from student...');

									const b64 : any = localStorage.getItem('data');
									const store : any = base64_decode(b64) ;
									const locale = JSON.parse(store).result.value[0][0].locale;

									const data = {
										connid: localStorage.getItem('connid'),
										locale: locale,
										studentid: userid,
										parentid: row.userid
									};

									dispatch(removeStudentParentAsync(data)).then((value) => {
										const result = value.payload ;
										if(result.error === false) {
											// We have the db results here
											const dataSource = result.result.value;
											setFilteredParents(dataSource);
											setOriginalParents(dataSource);
			
											setLoading(false);
			
											Modal.success({
												content: 'Parent removed from student successfully!',
												okType: 'danger',
												okButtonProps:  {style: {backgroundColor: Color.students, borderColor: Color.students, borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
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
												title: `Remove student parent`,
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
								}
							});
						}
					}}>
					{modalVisible? <ArrowUpIcon color={Color.students}/>  : <ThrashIcon color={Color.students} size='18px' line='20px'/> }
					
				</Button>
			</Flex>
		},
		{
			title: 'Userid',
			dataIndex: 'userid',
			key: 'roleid',
			width: '10%',
			hidden: true
		},
    ].filter(item => !item.hidden);

    return (
        <>
			<Flex>
            	<Spin spinning={loading} tip={loadingMessage}>
					<CustomTable 
						columns={columns} 
						source={filteredParents} 
						rowKey='userid' 
						filter={filterTable}
						searchIconColor={Color.students}
					/>
					<AddButton hint='Add student parent' icon={<PlusIcon/>} top='-50px' float='right' color={Color.students} onClick={fetchAllParents}/>
				</Spin>

				<CustomModal visible={modalVisible} title='All parents' columns={columns} tableKey='userid'
							onOk={handleOkAddParents} onCancel={handleCancelAddParents} onClose={handleCancelAddParents}
							onFilter={filterStudentParentsTable} spin={modalSpin} spinMessage='Fetching all parents' okDisabled={true} width={1000}
							okColor={Color.students} source={filteredAllParents}/>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default StudentParents;