import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';

const LogOutIcon: React.FC = () => {
  const AppIcon = () => (
        <LogoutOutlined
            style={{
                color: "black",
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

export default LogOutIcon;
