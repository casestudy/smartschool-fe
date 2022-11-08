import  React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import PlusIcon from '../../../Components/UI/Icons/PlusIcon';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import AddButton from '../../../Components/UI/Button/AddButton';

const RolePrivileges: React.FC<any> = ({}) => {

    const navigate = useNavigate();

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
            width: '5%'
			// render: (text:any,row:any) => <Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}} onClick={() => {
			// 	localStorage.setItem("role", JSON.stringify(row));
			// 	navigate('/roles/visualize');
			// }}><VisualizeIcon/></Button>
        },
		{
			title: 'Role Id',
			dataIndex: 'roleid',
			key: 'roleid',
			width: '5%',
			hidden: true
		},
    ].filter(item => !item.hidden);

    return (
        <>
            <Flex>
                <CustomTable columns={columns}/>
                <AddButton icon={<PlusIcon/>} top='-50px' float='right' onClick={() => {navigate('/roles/new')}}/>
            </Flex>
		</>
    );
};

const Flex = styled.div``;

export default RolePrivileges;