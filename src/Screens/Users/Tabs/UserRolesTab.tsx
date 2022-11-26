import  React, { useEffect, useState } from 'react';

import { Row , Col, Button, Modal, Spin } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';

import Danger from '../../../Components/UI/Icons/Danger';
import ArrowUpIcon from '../../../Components/UI/Icons/ArrowUp';
import ThrashIcon from '../../../Components/UI/Icons/ThrashIcon';

import Title from '../../../Components/UI/Messages/Title';
import Message from '../../../Components/UI/Messages/Message';

import Color from '../../../Components/UI/Header/Theme.json';
import { useAppDispatch } from '../../../State/Hooks';
import { getUserRolesAsync } from '../../../State/Thunks/UsersThunks';


interface Prop {
	userid?: number,
    usertype?: string,
	userfullname: string,
}

const UserRole: React.FC<Prop> = ({userid, usertype, userfullname}) => {

	const { confirm, info } = Modal;

    const [loading, setLoading] = useState(true);
	const [originalUserRoles, setOriginalUserRoles] = useState([]);
	const [filteredUserRoles, setFilteredUserRoles] = useState([]);

    const dispatch = useAppDispatch();

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
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: '5%',
			render: (text:any,row:any) => <Flex style={{display: 'flex', alignItems: 'center'}}><Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} onClick = {(() => {
				confirm({
					title: <Title value={'Revoke Role'}/>,
					icon: <Danger color={usertype === 'teacher'? Color.teachers : Color.subjects}/>,
					width: '600px',
					content: <Message value='Do you really want to revoke this role from user: ' 
										item={userfullname} msg='He will no longer be able to perform actions associated to this role.'
										warn=''/>,
					okText: 'Yes',
					okType: 'danger',
					okButtonProps:  {style: {backgroundColor: usertype === 'teacher'? Color.teachers : Color.subjects, borderRadius: '8px', borderColor: usertype === 'teacher'? Color.teachers : Color.subjects, fontWeight: 800, color: '#FFF'}},
					cancelText: 'Cancel',
					cancelButtonProps: {style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}},
					onOk() {
						console.log("Deleting user role now");
					}
				})
			})} ><ThrashIcon color={usertype === 'teacher'? Color.teachers : Color.subjects}/></Button></Flex>
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
        const data = {
			connid: localStorage.getItem('connid'),
            userid: userid
		};

        dispatch(getUserRolesAsync(data)).then((value) => {
			const result = value.payload ;
			//console.log(result);
			if(result.error === false) {
				// We have the db results here
				const dataSource = result.result.value;
				setFilteredUserRoles(dataSource);
				setOriginalUserRoles(dataSource);
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
					title: usertype === 'teacher'? `Teachers` : `Administrators`,
					content: msg + ' (' + code + ')',
					icon: <Danger color={usertype === 'teacher'? Color.teachers : Color.subjects}/>
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
			<CustomTable columns={columns} source={filteredUserRoles} rowKey='roleid' searchIconColor={usertype === 'teacher'? Color.teachers : Color.subjects}/>
		</>
    );
};

const Flex = styled.div``;

export default UserRole;