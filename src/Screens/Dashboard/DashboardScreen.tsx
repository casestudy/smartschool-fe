import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import { decode as base64_decode } from 'base-64';

import Header from '../../Components/UI/Header/Header';

const DashboardScreen: React.FC<any> = () => {
	let ll: any = localStorage.getItem('lastlogin');

    return (
        <Flex>
            <Header title='Dashboard' loggedin={true} lastlogin={ll}></Header>
        </Flex>
    );
    
};
const Flex = styled.div``;
export default DashboardScreen;
  