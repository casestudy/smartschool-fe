import React from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from 'react-router-dom';

import BackButton from '../../Components/UI/Button/BackButton';
import BackIcon from '../../Components/UI/Icons/BackArrow';

import Header from '../../Components/UI/Header/Header';
import CreateUserForm from '../../Components/Form/User/CreateUserForm';
import { Col, Row } from "antd";

const CreateUserScreen: React.FC<any> = () => {
    let ll: any = localStorage.getItem('lastlogin');
	const navigate = useNavigate();

    const { state } = useLocation();

    return (
        <>
			<Flex>
                <Header title = {state.usertype === 'teacher'? 'Teachers' : 'Administrators'} loggedin={true} lastlogin={ll}></Header>
                <Row>
                    <Col md={18}>
                        <Flex style={{padding: "5rem 5rem 1px 5rem", display: "flex"}}>
							<BackArrow>
								<BackButton icon={<BackIcon/>} onClick={() => {state.usertype === 'teacher'? navigate('/teachers') : navigate('/administrators')}}/>
							</BackArrow>
							<Flex style={{columnGap: '4rem'}}>
								<Title>{state.title}</Title>
							</Flex>
                        </Flex>
						<StyledFormBody style={{padding: "5rem 5rem 1px 5rem"}}>
							<Filler/>
                            {(state.userid !== undefined)? 
                                        <CreateUserForm disp="block" userid={state.userid} utype={state.usertype} username={state.username}
                                            surname={state.surname} othernames={state.othernames} emailaddress={state.emailaddress} 
                                            phonenumber={state.phonenumber} gender={state.gender} idle={state.onidle}
                                            locale={state.locale} dob={state.dob} position={state.usertype === 'administrator'? state.position: ''}/> 
                                    : 
                                        <CreateUserForm disp="none" utype={state.usertype}/>}
							
						</StyledFormBody>
                    </Col>
                    <Col md={6}></Col>
                </Row>
            </Flex>
        </>
    );
};

const Flex = styled.div``;
const BackArrow = styled.div`
    width: 5%;
    & button {
        background: transparent !important;
        border: none
    }
`;
const Title = styled.div`
	font-size: 1.125rem;
	font-weight: 800;
	text-transform: uppercase;
`;
const StyledFormBody = styled.div`
    display: flex;
	font-size: 1rem;
`;
const Filler = styled.div`
	width: 5%;
`;
export default CreateUserScreen;