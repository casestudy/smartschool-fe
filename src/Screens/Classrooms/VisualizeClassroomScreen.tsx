import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useLocation, useNavigate } from 'react-router-dom';
import { decode as base64_decode} from 'base-64';

import BackButton from '../../Components/UI/Button/BackButton';
import BackIcon from '../../Components/UI/Icons/BackArrow';

import Header from '../../Components/UI/Header/Header';
import TeachersTab from './Tabs/ClassroomTeachersTab';
import StudentsTab from './Tabs/ClassroomStudentsTab';

import Color from '../../Components/UI/Header/Theme.json';
// import SubRoles from './Tabs/SubRolesTab';
import { Col, Row } from "antd";

const VisualizeRoleScreen: React.FC<any> = () => {
	const [currentTab, setCurrentTab] = useState('Teachers');
	const [currentTabView, setCurrentTabView] = useState(<></>);
	const [title, setCurrentTitle] = useState('');
	
    let ll: any = localStorage.getItem('lastlogin');
	const navigate = useNavigate();

    const { state } = useLocation();

	useEffect(() => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;
		
		if(currentTab === 'Teachers') {
			setCurrentTabView(<TeachersTab classid={state.classid} locale={locale}/>);
		} else if(currentTab === 'Students') {
			setCurrentTabView(<StudentsTab/>);
		}
	}, [currentTab]);

    return (
        <>
			<Flex>
                <Header title='Classrooms' loggedin={true} lastlogin={ll}></Header>
                <Row>
                    <Col md={18}>
                        <Flex style={{padding: "5rem 5rem 1px 5rem", fontWeight: 700, fontSize: "1.2rem", alignItems: "center", marginBottom: 0, display: "flex"}}>
                            <BackArrow>
								<BackButton icon={<BackIcon/>} onClick={() => {navigate('/classrooms')}}/>
							</BackArrow>
                            <Flex style={{columnGap: '1rem', display: 'flex'}}>
								<Title>Classrooms</Title> <Title style={{textTransform: 'lowercase'}}>"{state.title}"</Title> <Title>Details</Title>
							</Flex>
							<TabHeader 
								key={`classroom-teachers`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'Teachers' ? Color.classrooms : '#000'
								}}
								onClick={() => {setCurrentTab('Teachers')}}
							>
                                {'Teachers'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'Teachers' ? 'visible' : 'hidden'}}/>
								</Flex>
								
                            </TabHeader>

							<TabHeader
								key={`classroom-students`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'Students' ? Color.classrooms : '#000'
								}}
								onClick={() => {setCurrentTab('Students')}}
							>
                                {'Students'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'Students' ? 'visible' : 'hidden'}}/>
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
    border: 2px solid ${Color.classrooms};
	display: flex;
	justify-content: center;
    &:Hover {
        border: 2px solid color: ${Color.classrooms};
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
export default VisualizeRoleScreen;