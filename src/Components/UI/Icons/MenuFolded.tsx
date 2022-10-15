import React from 'react';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const MenuFoldedIcon: React.FC = () => {
  const AppIcon = () => (
        <MenuFoldOutlined
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

export default MenuFoldedIcon;
