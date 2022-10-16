import React, { useEffect } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import Header from '../../Components/UI/Header/Header';
import LoginCard from '../../Components/UI/Card/LoginCard';

const LoginScreen: React.FC<any> = () => {
    useEffect(() => {}, []);
    return (
        <Flex>
            <Header title='Login' loggedin={false}></Header>
            <LoginCard></LoginCard>
        </Flex>
    );
  };
  const Flex = styled.div``;
  export default LoginScreen;
  