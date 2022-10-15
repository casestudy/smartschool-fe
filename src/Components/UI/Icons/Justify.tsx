import React, { MouseEventHandler } from 'react';
import MenuFoldedIcon from './MenuFolded';
import MenuUnFoldedIcon from './MenuUnfolded';
import { Button } from 'antd';

interface Prop {
    onClick: MouseEventHandler;
    collapsed: boolean;
}

const JustifyIcon: React.FC<Prop> = ({onClick, collapsed}) => {    
    const AppIcon = () => (
        <Button type='primary' onClick={onClick} style={{ marginBottom: 16, background: "#6076bf", border: "0px", marginRight: "1rem"}} icon={collapsed? <MenuUnFoldedIcon/> : <MenuFoldedIcon/>} /> 
    );
    return <AppIcon/>;
};

export default JustifyIcon;
