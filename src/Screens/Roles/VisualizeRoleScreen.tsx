import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate } from 'react-router-dom';

import BackButton from '../../Components/UI/Button/BackButton';
import BackIcon from '../../Components/UI/Icons/BackArrow';

import Header from '../../Components/UI/Header/Header';
import ModifyRole from './Tabs/ModifyRoleTab';
import { Col, Row } from "antd";

const VisualizeRoleScreen: React.FC<any> = () => {
	const [currentTab, setCurrentTab] = useState('Modify');
	const [currentTabView, setCurrentTabView] = useState(<></>);
	const [title, setCurrentTitle] = useState('');
	
    let ll: any = localStorage.getItem('lastlogin');
	const navigate = useNavigate();

	useEffect(() => {
		const title: any = localStorage.getItem("role");
		setCurrentTitle(JSON.parse(title).rname);

		if(currentTab === 'Modify') {
			setCurrentTabView(<ModifyRole/>);
		} else if(currentTab === 'SubRoles') {
			setCurrentTabView(<></>);
		} else if(currentTab === 'Privileges') {
			setCurrentTabView(<></>);
		}
	}, [currentTab]);

    return (
        <>
			<Flex>
                <Header title='Roles' loggedin={true} lastlogin={ll}></Header>
                <Row>
                    <Col md={18}>
                        <Flex style={{padding: "5rem 5rem 1px 5rem", fontWeight: 700, fontSize: "1.2rem", alignItems: "center", marginBottom: 0, display: "flex"}}>
                            <BackArrow>
								<BackButton icon={<BackIcon/>} onClick={() => {navigate('/roles')}}/>
							</BackArrow>
                            <Flex style={{columnGap: '1rem', display: 'flex'}}>
								<Title>Role</Title> <Title style={{textTransform: 'lowercase'}}>"{title}"</Title> <Title>Details</Title>
							</Flex>
							<TabHeader 
								key={`role-details-modify`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'Modify' ? '#BC6470' : '#000'
								}}
								onClick={() => {setCurrentTab('Modify')}}
							>
                                {'Modify'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'Modify' ? 'visible' : 'hidden'}}/>
								</Flex>
								
                            </TabHeader>

							<TabHeader
								key={`role-details-subroles`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'SubRoles' ? '#BC6470' : '#000'
								}}
								onClick={() => {setCurrentTab('SubRoles')}}
							>
                                {'Sub Roles'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'SubRoles' ? 'visible' : 'hidden'}}/>
								</Flex>
                            </TabHeader>

							<TabHeader
								key={`role-details-privileges`}
								style={{ 
									paddingLeft: "4rem", 
									color: currentTab === 'Privileges' ? '#BC6470' : '#000'
								}}
								onClick={() => {setCurrentTab('Privileges')}}
							>
                                {'Privileges'}
								<Flex style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
									<Line style={{ visibility: currentTab === 'Privileges' ? 'visible' : 'hidden'}}/>
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
export default VisualizeRoleScreen;