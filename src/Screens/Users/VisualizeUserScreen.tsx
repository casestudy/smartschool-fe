import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from 'react-router-dom';
import { decode as base64_decode} from 'base-64';

import BackButton from '../../Components/UI/Button/BackButton';
import BackIcon from '../../Components/UI/Icons/BackArrow';

import Header from '../../Components/UI/Header/Header';
import Color from '../../Components/UI/Header/Theme.json';
import UserRole from './Tabs/UserRolesTab';
// import RolePrivileges from './Tabs/RolePrivilegesTab';
// import SubRoles from './Tabs/SubRolesTab';
import { Col, Row } from "antd";

const VisualizeUserScreen: React.FC<any> = () => {
	const [currentTab, setCurrentTab] = useState('Roles');
	const [currentTabView, setCurrentTabView] = useState(<></>);
	const [title, setCurrentTitle] = useState('');
    const [titleS, setCurrentTitleS] = useState('');
	
    let ll: any = localStorage.getItem('lastlogin');

    const b64 : any = localStorage.getItem('data');
    const store : any = base64_decode(b64) ;
    const loggedinUser = JSON.parse(store).result.value[0][0].usertype;

	const navigate = useNavigate();

    const { state } = useLocation();

	useEffect(() => {
        if(state.usertype === 'teacher') {
            setCurrentTitle('Teachers');
            setCurrentTitleS('Teacher');
        } else {
            setCurrentTitle('Administrators');
            setCurrentTitleS('Administrator');
        }
		if(currentTab === 'Roles') {
			setCurrentTabView(<UserRole usertype={state.usertype} userid={state.row.userid} userfullname={state.row.surname + ' ' + state.row.othernames}/>);
		} else {
			setCurrentTabView(<></>);
		}
	}, [currentTab]);

    return (
        <>
			<Flex>
                <Header title = {title} loggedin={true} lastlogin={ll}></Header>
                <Row>
                    <Col md={18}>
                        <Flex style={{padding: "5rem 5rem 1px 5rem", fontWeight: 700, fontSize: "1.2rem", alignItems: "center", marginBottom: 0, display: "flex"}}>
                            <BackArrow>
								<BackButton icon={<BackIcon/>} onClick={() => {state.usertype === 'teacher'? navigate('/teachers') : navigate('/administrators')}}/>
							</BackArrow>
                            <Flex style={{columnGap: '1rem', display: 'flex'}}>
								<Title>{titleS}</Title> <Title style={{textTransform: 'lowercase'}}>"{state.row.username}"</Title> <Title>Details</Title>
							</Flex>
							<TabHeader 
								key={`user-details-roles`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'Roles' ? state.usertype === 'teacher'? Color.teachers : Color.subjects : '#000'
								}}
								onClick={() => {setCurrentTab('Roles')}}
							>
                                {'Roles'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'Roles' ? 'visible' : 'hidden', border: state.usertype === 'teacher'? '2px solid ' + Color.teachers : '2px solid ' + Color.subjects}}/>
								</Flex>
								
                            </TabHeader>

							<TabHeader
								key={`user-details-teaches`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'Teaches' ? state.usertype === 'teacher'? Color.teachers : Color.subjects : '#000'
								}}
								onClick={() => {setCurrentTab('Teaches')}}
							>
                                {'Teaches'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'Teaches' ? 'visible' : 'hidden', border: state.usertype === 'teacher'? '2px solid ' + Color.teachers : '2px solid ' + Color.subjects}}/>
								</Flex>
                            </TabHeader>

							{
								loggedinUser === 'administrator' ?
									<TabHeader
										key={`user-details-assistance`}
										style={{ 
											paddingLeft: "4rem", 
											color: currentTab === 'Assistance' ? state.usertype === 'teacher'? Color.teachers : Color.subjects : '#000'
										}}
										onClick={() => {setCurrentTab('Assistance')}}
									>
										{'Assistance'}
										<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
											<Line style={{ visibility: currentTab === 'Assistance' ? 'visible' : 'hidden', border: state.usertype === 'teacher'? '2px solid ' + Color.teachers : '2px solid ' + Color.subjects}}/>
										</Flex>
										
									</TabHeader>

								: ''
							}

							{
								loggedinUser === 'teacher' ?
									<TabHeader
										key={`user-details-documents`}
										style={{ 
											paddingLeft: "4rem", 
											color: currentTab === 'MyDocuments' ? state.usertype === 'teacher'? Color.teachers : Color.subjects : '#000'
										}}
										onClick={() => {setCurrentTab('MyDocuments')}}
									>
										{'My Documents'}
										<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
											<Line style={{ visibility: currentTab === 'MyDocuments' ? 'visible' : 'hidden', border: state.usertype === 'teacher'? '2px solid ' + Color.teachers : '2px solid ' + Color.subjects}}/>
										</Flex>
										
									</TabHeader>
								: ''
							}
                            
							{
								(loggedinUser === 'parent' || loggedinUser === 'administrator') ?
									<TabHeader
										key={`user-details-children`}
										style={{ 
											paddingLeft: "4rem", 
											color: currentTab === 'MyChildren' ? state.usertype === 'teacher'? Color.teachers : Color.subjects : '#000'
										}}
										onClick={() => {setCurrentTab('MyChildren')}}
									>
										{'My Children'}
										<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
											<Line style={{ visibility: currentTab === 'MyChildren' ? 'visible' : 'hidden', border: state.usertype === 'teacher'? '2px solid ' + Color.teachers : '2px solid ' + Color.subjects}}/>
										</Flex>
										
									</TabHeader>
								: ''
							}
                            
                        </Flex>
						<StyledTabPane style={{padding: "2rem 5rem 1px 5rem"}}>
							<Filler />
							<TabContent>{currentTabView}</TabContent>
						</StyledTabPane>
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
const TabHeader = styled.div`
    width: max-content;
    flex-direction: column;
    display: flex:
    align-items: center;
    cursor: pointer;
    font-size: 1.25rem;
    &:hover {
        color: #BC64702B;
    }
`;
const Line = styled.div`
	align-items: center;
    height: 0;
    width: 3.375rem;
    border: 2px solid #BC6470;
	display: flex;
	justify-content: center;
    &:Hover {
        border: 2px solid color: #BC64702B;
    }
`;
const StyledTabPane = styled.div`
	display: flex;
	font-size: 14rem;
`;
const TabContent = styled.div`
	width: 95%;
`;
const Filler = styled.div`
	width: 5%;
`;
export default VisualizeUserScreen;