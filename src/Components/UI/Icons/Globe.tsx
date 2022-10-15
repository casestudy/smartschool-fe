import React from 'react';
import { GlobalOutlined } from '@ant-design/icons';

const GlobeIcon: React.FC = () => {
  const AppIcon = () => (
        <GlobalOutlined
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

export default GlobeIcon;
