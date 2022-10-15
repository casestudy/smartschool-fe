import React, { useEffect } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';

import Header from '../../Components/UI/Header/Header';
// import LeftMenu from '../../Components/UI/Menu/LeftMenu';

const LoginScreen: React.FC<any> = () => {
    useEffect(() => {}, []);
    //const collapsed : boolean = localStorage.getItem("collapsed") === "true"? true : false;
    return (
        <Flex>
            <Header title='Login' loggedin={false}></Header>
            {/* <LeftMenu collapsed={collapsed}/> */}
        </Flex>
    );
  };
  const Flex = styled.div``;
  export default LoginScreen;
  