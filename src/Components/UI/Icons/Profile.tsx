import React from 'react';
import { IdcardOutlined  } from '@ant-design/icons';

const ProfileIcon: React.FC = () => {
  const AppIcon = () => (
        <IdcardOutlined
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

export default ProfileIcon;
