import  React, { useEffect, useState } from 'react';

import { Row , Col, Button, Modal, Spin } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';
import { decode as base64_decode} from 'base-64';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';
import CustomModal from '../../../Components/UI/Modal/Modal';

import Danger from '../../../Components/UI/Icons/Danger';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';
import PlusIcon from '../../../Components/UI/Icons/PlusIcon';
import MinusIcon from '../../../Components/UI/Icons/MinusIcon';
import ArrowUpIcon from '../../../Components/UI/Icons/ArrowUp';

import Title from '../../../Components/UI/Messages/Title';
import Message from '../../../Components/UI/Messages/Message';

import Color from '../../../Components/UI/Header/Theme.json';
import { useAppDispatch } from '../../../State/Hooks';
import { fetchTeacherSubjectsAsync } from '../../../State/Thunks/TeachersThunk';
import CheckboxField from '../../../Components/UI/Input/CheckBox';


interface Prop {
	userid?: number,
    usertype?: string,
	userfullname: string,
}

const TeacherClasses: React.FC<Prop> = ({userid, usertype}) => {

	const { confirm, info } = Modal;

    const [loading, setLoading] = useState(false);
	const [originalUserRoles, setOriginalUserRoles] = useState([]);
	const [filteredUserRoles, setFilteredUserRoles] = useState([]);
	const [userRolesBatch, setUserRolesBatch] = useState<string[]>([]);
	const [allRolesBatch, setAllRolesBatch] = useState<string[]>([]);
	const [allRoles, setAllRoles] = useState([]);
	const [filteredAllRoles, setFilteredAllRoles] = useState([]);

	const [isAddUserRoleModalOpen, setIsAddUserRoleModalOpen] = useState(false);

	const [modalLoading, setModalLoading] = useState(false);
	const [modalLoadingMessage, setModalLoadingMessage] = useState('');

    const dispatch = useAppDispatch();

	const b64 : any = localStorage.getItem('data');
	const store : any = base64_decode(b64) ;

	const filterTable = (e: any) => {
		const filt = originalUserRoles.filter((x:any) => x.rname.toLowerCase().includes(e.toLowerCase()) || x.descript.toLowerCase().includes(e.toLowerCase()));
		setFilteredUserRoles(filt);
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
			title: 'Subject name',
			dataIndex: 'sname',
			key: 'sname',
			width: '22%',
			sorter: (a: any, b: any) => a.rname.localeCompare(b.rname)
        },
        {
			title: 'Subject code',
			dataIndex: 'scode',
			key: 'scode',
			width: '22%'
        },
        {
			title: 'Class name and abbreviation',
			dataIndex: 'cname',
			key: 'cname',
			width: '30%'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '5%',
        },
		{
			title: 'Subject Id',
			dataIndex: 'subjectid',
			key: 'subjectid',
			width: '2%',
			hidden: true
		},
        {
			title: 'Classroom Id',
			dataIndex: 'classroomid',
			key: 'classroomid',
			width: '2%',
			hidden: true
		},
    ].filter(item => !item.hidden);


    useEffect(() => {
        const data = {
			connid: localStorage.getItem('connid'),
            //userid: userid,
		};

        dispatch(fetchTeacherSubjectsAsync(data)).then((value) => {

            console.log(value);
			// const result = value.payload ;
			// //console.log(result);
			// if(result.error === false) {
			// 	// We have the db results here
			// 	const dataSource = result.result.value;
			// 	setFilteredUserRoles(dataSource);
			// 	setOriginalUserRoles(dataSource);
			// 	setLoading(false);
			// } else {
			// 	//An axios error
			// 	let msg = '';
			// 	let code = '';
	
			// 	if(result.status === 400) {
			// 		msg = result.message;
			// 		code = result.code;
			// 	} else {
			// 		//It is error from the back end
			// 		msg = result.error.msg;
			// 		code = result.error.code;
			// 	}
			// 	const modal = Modal.error({
			// 		title: usertype === 'teacher'? `Teachers` : `Administrators`,
			// 		content: msg + ' (' + code + ')',
			// 		icon: <Danger color={usertype === 'teacher'? Color.teachers : Color.subjects}/>
			// 	});
	
			// 	modal.update({});
			// 	setLoading(false);
			// }
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
    },[])


    return (
        <>
			<Spin spinning={loading} tip='Fetching user roles...'>
				<CustomTable columns={columns} source={filteredUserRoles} rowKey='roleid' searchIconColor={usertype === 'teacher'? Color.teachers : Color.subjects} filter={filterTable}/>
				<Flex style={{marginTop: '-50px', float:'right', display: 'flex'}}>
					<Flex style={{paddingRight: '15px'}}>
						<AddButton icon={<MinusIcon/>} color={usertype === 'teacher'? Color.teachers : Color.subjects} hint='Remove selected roles from user' onClick={() => {}} />
					</Flex>
					<AddButton icon={<PlusIcon/>} color={usertype === 'teacher'? Color.teachers : Color.subjects} hint='Add roles to user' onClick={() => {}}/>
				</Flex>
			</Spin>
			
			{/* <CustomModal visible={isAddUserRoleModalOpen} title='All Roles' 
								okText='Add selected roles' onOk={handleOkAddUserRoleBatch} onCancel={handleCancelAddUserRole} 
								columns={allRolesColumns} source={filteredAllRoles} tableKey='roleid' onFilter={filterAllRolesTable} onClose={handleCancelAddUserRole}
								okDisabled={allRolesBatch.length > 0? false : true} spin={modalLoading} spinMessage={modalLoadingMessage} width={1000}
								okColor={usertype === 'teacher'? Color.teachers : Color.subjects}/> */}
		</>
    );
};

const Flex = styled.div``;

export default TeacherClasses;