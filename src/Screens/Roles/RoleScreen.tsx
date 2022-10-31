import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Row , Col, Button, Modal } from 'antd';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import VisualizeIcon from '../../Components/UI/Icons/Visualize';
import Danger from '../../Components/UI/Icons/Danger';

import Header from '../../Components/UI/Header/Header';
import CustomTable from '../../Components/UI/Table/CustomTable';

import { useAppDispatch, useAppSelector} from '../../State/Hooks';
import { fetchRolesAsync } from '../../../src/State/Thunks/RolesThunk';

const RoleScreen: React.FC<any> = () => {
	let ll: any = localStorage.getItem('lastlogin');

	const dispatch = useAppDispatch();
	const data = {
		
	};
	dispatch(fetchRolesAsync(data)).then((value) => {
		console.log(value);
		const result = value.payload ;

		if(result.error === false) {
			// We have the db results here
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
		}
	},(error) => {
		console.log("Error");
		console.log(error);
	} );
	
    const columns = [
        {
			title: 'SN',
			dataIndex: 'sn',
			key: 'sn',
			width: '5%'
        },
        {
			title: 'Name',
			dataIndex: 'rname',
			key: 'rname',
			width: '25%'
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
			render: () => <Button type='text' style={{color: 'BC6470', fontSize: '1rem', fontWeight: '600'}}><VisualizeIcon/></Button>
        },
		{
			title: 'Role Id',
			dataIndex: 'roleid',
			key: 'roleid',
			width: '5%',
			hidden: true
		},
    ].filter(item => !item.hidden);

	const dataSource = [
		{
			key: '1',
			sn: '1',
			rname: 'Admin Role',
			descript: 'Admin Role description',
			visualize: '10',
			roleid: '1'
		},
		{
			key: '2',
			sn: '2',
			rname: 'Admin Role 2',
			descript: 'Admin Role description 2',
			visualize: '10',
			roleid: '2'
		},
	];
    return (
        <Flex>
            <Header title='Roles' loggedin={true} lastlogin={ll}></Header>
            <Row>
                <Col md={18}>
                    <div style={{padding: "1rem 5rem 1px 5rem"}}>
                        <CustomTable columns={columns} source={dataSource}/>
                    </div>
                </Col>
                <Col md={6}>Notifications</Col>
            </Row>
        </Flex>
    );
    
};
const Flex = styled.div``;
const Container = styled.div`
    padding: "10px 20px 5px 5px",
`;
export default RoleScreen;
  