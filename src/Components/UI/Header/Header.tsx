import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal, Typography } from 'antd';
import { Divider } from 'antd';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { decode as base64_decode } from 'base-64';

import { useAppDispatch } from '../../../State/Hooks';

import Globe from '../Icons/Globe';
import User from '../Icons/User';
import UKIcon from '../Icons/UKingdom';
import FrIcon from '../Icons/France';
import LockIcon from '../Icons/Lock';
import LogoutIcon from '../Icons/Logout';
import ProfileIcon from '../Icons/Profile';
import MoonIcon from '../Icons/Moon';
import MenuIcon from '../Icons/Menu';

import Label from '../Label/Label';
import AppMenu from '../Menu/AppMenu';
import Color from './Theme.json';


import { HeaderContainer } from './Header.style';
import './Header.css';

import { logoutUserAsync } from '../../../State/Thunks/LoginThunk';
import Danger from '../../../Components/UI/Icons/Danger';

interface Prop {
    title: string;
	lastlogin?: string;
	loggedin: boolean;
}

const { Title } = Typography;

const Header: React.FC<Prop> = ({title, lastlogin, loggedin}) => {
	const [collapsed, setCollapsed] = useState(false);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

	const appsMenu = () => {
		toggleCollapsed();
	}

	const onUserDataClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case 'logout':
				logoutUser();
				break;
		
			default:
				break;
		}
	};

	const logoutUser = () => {
		const b64 : any = localStorage.getItem('data');
        const store : any = base64_decode(b64) ;
        const locale = JSON.parse(store).result.value[0][0].locale;

		const data = {
			locale: locale,
			connid: localStorage.getItem('connid'),
		}

		dispatch(logoutUserAsync(data)).then((value) => {
			const result = value.payload ;
			if(result.error === false) {
				// We have the db results here
				const modal = Modal.success({
					title: 'Logout',
					content: 'Logout successful!',
				});
	
				modal.update({});

				localStorage.clear();
				navigate('/');
				window.location.reload();
				
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
					title: 'Logout',
					content: msg + ' (' + code + ')',
					icon: <Danger color={Color.classrooms}/>
				});
	
				modal.update({});
			}
		},(error) => {
			console.log("Error");
			console.log(error);
		} );
	}

	const items: MenuProps['items'] = [
		{
			label: <Title level={4} style={{
					display: "flex",
					alignItems: "center",
					color: "#fff",
					fontFamily: "Open Sans",
					fontStyle: "normal",
					fontWeight: 800,
					fontSize: "18px",
					lineHeight: "33px",
					padding: "0.5rem 0 0 0"
				}}>
				Last Logged in on:	{lastlogin}
			</Title>,
			key: 'test'
		},
		{
			key: 'locales',
			icon: <Globe/>,
			children: [
				{
					icon: <UKIcon/>,
					label: <Label value='English'/>,
					key: 'en'
				},
				{
					icon: <FrIcon/>,
					label: <Label value='Français'/>,
					key: 'fr'
				}
			]
		},
		loggedin?
		{
			key: 'profile',
			icon: <User color='#fff' size='22px' line='33px'/>,
			children: [
				{
					icon: <ProfileIcon/>,
					label: <Label value='User Profile'/>,
					key: 'userprofile'
				},
				{
					icon: <LogoutIcon/>,
					label: <Label value='Logout'/>,
					key: 'logout'
				},
				{
					icon: <LockIcon color='#fff' size='22px' line='33px'/>,
					label: <Label value='Lock Screen'/>,
					key: 'lockscreen'
				},
				{
					icon: <MoonIcon/>,
					label: <Label value='Dark Mode'/>,
					key: 'darkmode'
				}
			]
		}:{key:'profile', style:{display: 'none'}},
		loggedin? {key: 'menu', icon: <MenuIcon/>, onClick: appsMenu} : {key:'menu', style:{display: 'none'}},
	] ;

	let color = '';
	if (title.toLocaleLowerCase() === 'dashboard') {
		color = Color.dashboard;
	} else if (title.toLocaleLowerCase() === 'roles') {
		color = Color.roles;
	} else if (title.toLocaleLowerCase() === 'subjects') {
		color = Color.subjects;
	} else if (title.toLocaleLowerCase() === 'groups') {
		color = Color.groups;
	} else if (title.toLocaleLowerCase() === 'classrooms') {
		color = Color.classrooms;
	} else if (title.toLocaleLowerCase() === 'teachers') {
		color = Color.teachers;
	} else if (title.toLocaleLowerCase() === 'administrators') {
		color = Color.administrators;
	} else if (title.toLocaleLowerCase() === 'students') {
		color = Color.students;
	} else if (title.toLocaleLowerCase() === 'calendar') {
		color = Color.calendar;
	}

    return (
        <HeaderContainer>
			<div
				style={{
					display: "flex",
					width: "50%",
					height: "2.9rem",
					flexDirection: "row",
					alignItems: "center",
					backgroundColor: `${color}`,
					padding: "0 0 0 2rem",
					borderBottomRightRadius: "93px",
        		}}
			>
				<Title
					level={4}
					style={{
					  display: "flex",
					  alignItems: "center",
					  color: "#fff",
					  fontFamily: "Open Sans",
					  fontStyle: "normal",
					  fontWeight: 800,
					  fontSize: "23px",
					  lineHeight: "33px",
					  padding: "0.5rem 0 0 0"
					}}
				>
					Smart School
				</Title>
				<Divider
					type="vertical"
					style={{
						backgroundColor: "#fff",
						width: "0.1rem",
						height: "1.8rem",
						margin: "0 2rem 0 2rem",
					}}
				/>
				<Title
					level={4}
					style={{
						display: "flex",
						alignItems: "center",
						color: "#fff",
						fontFamily: "Open Sans",
						fontStyle: "normal",
						fontWeight: 800,
						fontSize: "23px",
						lineHeight: "33px",
						padding: "0.5rem 0 0 0"
					}}>
					{title}
				</Title>
			</div>
			<Menu
				theme="light"
				mode="horizontal"
				className="menu"
				style={{
					backgroundColor: "rgb(65, 61, 61)",
					borderBottomRightRadius: "18px",
					display: "flex",
					flexDirection: "row",
					alignItems: "right",
					justifyContent: "flex-end",
					height: "2.8rem",
					width: "100%"
				}}
				onClick={onUserDataClick}
				items={items}
			/>
			{collapsed?<AppMenu height='448px' visibility='visible'/> : <AppMenu height='0px' visibility='hidden'/>}
        </HeaderContainer>
    );
};

export default Header;