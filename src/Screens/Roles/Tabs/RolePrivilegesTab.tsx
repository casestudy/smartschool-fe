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

import { useAppDispatch, useAppSelector} from '../../../State/Hooks';
import { getRolePermsAsync } from '../../../../src/State/Thunks/RolesThunk';

const RolePrivileges: React.FC<any> = ({}) => {
    const [loading, setLoading] = useState(true);
    const [originRoles, setOriginRoles] = useState([]);
	const [filteredRoles, setFilteredRoles] = useState([]);

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

    const columns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '5%',
			render: (text:any,record:any,index:any) => (index+1)
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
				localStorage.setItem("role", JSON.stringify(row));
				navigate('/roles/visualize');
			}}><ThrashIcon/></Button>
        },
		{
			title: 'Mode',
			dataIndex: 'mode',
			key: 'mode',
			width: '40%',
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