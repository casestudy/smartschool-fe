import React from 'react';
import { UserOutlined } from '@ant-design/icons';

interface Prop {
	color: string;
	size: string;
	line: string;
}

const GlobeIcon: React.FC<Prop> = ({color, size, line}) => {
  const AppIcon = () => (
        <UserOutlined
            style={{
                color: `${color}`,
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: `${size}`,
                lineHeight: `${line}`,
                padding: "0.5rem 0 0 0"
            }}
        />	
  );
  return <AppIcon/>;
};

export default GlobeIcon;

//#fff, size: 20px line 33px