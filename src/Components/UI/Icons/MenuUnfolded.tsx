import React from 'react';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const MenuUnFoldedIcon: React.FC = () => {
  const AppIcon = () => (
        <MenuUnfoldOutlined
            style={{
                color: "#fff",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "20px",
                lineHeight: "33px",
                padding: "0.5rem 0 0 0"
            }}
        />  
  );
  return <AppIcon/>;
};

export default MenuUnFoldedIcon;
