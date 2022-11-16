import React, { useState } from 'react';

import { Typography } from 'antd';
import { Divider } from 'antd';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

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

interface Prop {
    title: string;
	lastlogin?: string;
	loggedin: boolean;
}

const { Title } = Typography;

const Header: React.FC<Prop> = ({title, lastlogin, loggedin}) => {
	const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

	const appsMenu = () => {
		toggleCollapsed();
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
				items={items}
			/>
			{collapsed?<AppMenu height='448px' visibility='visible'/> : <AppMenu height='0px' visibility='hidden'/>}
        </HeaderContainer>
    );
};

export default Header;