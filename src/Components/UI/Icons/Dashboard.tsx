import React from 'react';
import { DashboardOutlined } from '@ant-design/icons';

const DashboardIcon: React.FC = () => {
  const DashboardIcon = () => (
        <DashboardOutlined
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
  return <DashboardIcon/>;
};

export default DashboardIcon;
