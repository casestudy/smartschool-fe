import React from 'react';
import { LockOutlined } from '@ant-design/icons';

const LockIcon: React.FC = () => {
  const AppIcon = () => (
        <LockOutlined
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

export default LockIcon;
