import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from 'react-router-dom';
import { decode as base64_decode} from 'base-64';

import BackButton from '../../Components/UI/Button/BackButton';
import BackIcon from '../../Components/UI/Icons/BackArrow';

import Header from '../../Components/UI/Header/Header';
import Color from '../../Components/UI/Header/Theme.json';
import StudentParents from './Tabs/StudentParentsTab';
// import TeacherClasses from './Tabs/TeacherClassesTab';
// import RolePrivileges from './Tabs/RolePrivilegesTab';
// import SubRoles from './Tabs/SubRolesTab';
import { Col, Row } from "antd";

const VisualizeStudentScreen: React.FC<any> = () => {
	const [currentTab, setCurrentTab] = useState('Parents');
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
		if(currentTab === 'Parents') {
			setCurrentTabView(<StudentParents userid={state.row.userid} />);
		} else {
			setCurrentTabView(<></>);
		}
	}, [currentTab]);

    return (
        <>
			<Flex>
                <Header title = 'Students' loggedin={true} lastlogin={ll}></Header>
                <Row>
                    <Col md={18}>
                        <Flex style={{padding: "5rem 5rem 1px 5rem", fontWeight: 700, fontSize: "1.2rem", alignItems: "center", marginBottom: 0, display: "flex"}}>
                            <BackArrow>
								<BackButton icon={<BackIcon/>} onClick={() => {navigate('/students')}}/>
							</BackArrow>
                            <Flex style={{columnGap: '1rem', display: 'flex'}}>
								<Title>Student</Title> <Title style={{textTransform: 'initial'}}>"{state.row.surname+' '+ state.row.othernames}"</Title> <Title>Details</Title>
							</Flex>
							<TabHeader 
								key={`student-details-parents`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'Parents'? Color.students : '#000'
								}}
								onClick={() => {setCurrentTab('Parents')}}
							>
                                {'Parents'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'Parents' ? 'visible' : 'hidden', border: '2px solid ' + Color.students}}/>
								</Flex>
								
                            </TabHeader>
							<TabHeader
                                key={`student-details-fees`}
                                style={{ 
                                    paddingLeft: "4rem", 
                                    color: currentTab === 'Fees' ? Color.students : '#000'
                                }}
                                onClick={() => {setCurrentTab('Fees')}}
                            >
                                {'Fees'}
                                <Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Line style={{ visibility: currentTab === 'Fees' ? 'visible' : 'hidden', border: '2px solid ' + Color.students}}/>
                                </Flex>
                            </TabHeader>
							<TabHeader
                                key={`student-details-picture`}
                                style={{ 
                                    paddingLeft: "4rem", 
                                    color: currentTab === 'Picture' ? Color.students : '#000'
                                }}
                                onClick={() => {setCurrentTab('Picture')}}
                            >
                                {'Picture'}
                                <Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Line style={{ visibility: currentTab === 'Picture' ? 'visible' : 'hidden', border: '2px solid ' + Color.students}}/>
                                </Flex>
                                
                            </TabHeader>
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
export default VisualizeStudentScreen;