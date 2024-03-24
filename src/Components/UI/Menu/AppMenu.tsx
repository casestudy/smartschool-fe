import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { Col, Row } from 'antd';

import { decode as base64_decode} from 'base-64';

import AdminIcon from '../Icons/Admin';
import TeacherIcon from '../Icons/Teacher';
import StudentIcon from '../Icons/Students';
import ParentIcon from '../Icons/Parents';
import RolesIcon from '../Icons/Roles';
import SubjectsIcon from '../Icons/Subjects';
import GroupsIcon from '../Icons/Groups';
import ClassroomIcon from '../Icons/Classrooms';
import RequestIcon from '../Icons/Requests';
import AssistanceIcon from '../Icons/Assistances';
import CalendarIcon from '../Icons/Calendar';
import SettingsIcon from '../Icons/Settings';

import './AppMenu.css';
import styled from "styled-components";
  
interface Prop {
	height: string;
	visibility: DocumentVisibilityState;
}

const styleIcon: React.CSSProperties = {paddingTop: '30px', textAlign: 'center'};
const styleLabel: React.CSSProperties = {textAlign: 'center', fontWeight: '500', color: 'black !important'};

const LeftMenu: React.FC<Prop> = ({height, visibility}) => {
	useEffect(() => {
		const b64 : any = localStorage.getItem('data');
		const store : any = b64?base64_decode(b64) : '';
		const privs = store?JSON.parse(store).result.value[1] : 'ssssss';
	});

    return (
        <>
            <Flex style={{
					overflowY: "scroll", 
					overflowX: "hidden",
					position: "absolute", 
					top: "0px", 
					width: "380px", 
					zIndex: "911", 
					height: `${height}`, 
					marginTop: "57px", 
					right: "0px", 
					marginRight: "4px", 
					visibility: `${visibility}`, 
					border: "2px solid #dcdcdc",
					borderRadius: "15px",
					maxHeight: "calc(-65px + 100vh)"}}>
				
                <Row gutter={16}>
					<Col span={8} className="gutter-row">
						<Link to="/administrators" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><AdminIcon/></Row>
								<Row justify="center" style={styleLabel}>Administrators</Row>
							</Flex>
						</Link>
					</Col>
					<Col span={8} className="gutter-row">
						<Link to="/teachers" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><TeacherIcon/></Row>
								<Row justify="center" style={styleLabel}>Teachers</Row>
							</Flex>
						</Link>
					</Col>
					<Col span={8} className="gutter-row">
						<Link to="/students" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><StudentIcon/></Row>
								<Row justify="center" style={styleLabel}>Students</Row>
							</Flex>
						</Link>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8} className="gutter-row">
						<Row justify="center" align="middle" style={styleIcon}><ParentIcon/></Row>
						<Row justify="center" style={styleLabel}>Parents</Row>
					</Col>
					<Col span={8} className="gutter-row">
						<Link to="/roles" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><RolesIcon/></Row>
								<Row justify="center" style={styleLabel}>Roles</Row>
							</Flex>
						</Link>
					</Col>
					<Col span={8} className="gutter-row">
						<Link to="/subjects" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><SubjectsIcon/></Row>
								<Row justify="center" style={styleLabel}>Subjects</Row>
							</Flex>
						</Link>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8} className="gutter-row">
						<Link to="/groups" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><GroupsIcon/></Row>
								<Row justify="center" style={styleLabel}>Groups</Row>
							</Flex>
						</Link>
					</Col>
					<Col span={8} className="gutter-row">
						<Link to="/classrooms" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><ClassroomIcon/></Row>
								<Row justify="center" style={styleLabel}>Classrooms</Row>
							</Flex>
						</Link>
					</Col>
					<Col span={8} className="gutter-row">
						<Row justify="center" align="middle" style={styleIcon}><RequestIcon/></Row>
						<Row justify="center" style={styleLabel}>Requests</Row>
					</Col>
				</Row>
				<Row gutter={16} style={{paddingBottom: "30px"}}>
					<Col span={8} className="gutter-row">
						<Row justify="center" align="middle" style={styleIcon}><AssistanceIcon/></Row>
						<Row justify="center" style={styleLabel}>Assistances</Row>
					</Col>
					<Col span={8} className="gutter-row">
						<Link to="/calendar" className="app-menu-link">
							<Flex className="app-menu-item-container">
								<Row justify="center" align="middle" style={styleIcon}><CalendarIcon/></Row>
								<Row justify="center" style={styleLabel}>Calendar</Row>
							</Flex>
						</Link>
					</Col>
					<Col span={8} className="gutter-row">
						<Row justify="center" align="middle" style={styleIcon}><SettingsIcon/></Row>
						<Row justify="center" style={styleLabel}>Settings</Row>
					</Col>
				</Row>
            </Flex>
        </>
    );
};

const Flex = styled.div``;

export default LeftMenu;