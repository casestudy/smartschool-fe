import React from 'react';
import { LoginOutlined } from '@ant-design/icons';

interface Prop {
	color: string;
	size: string;
	line: string;
    padding: string;
}

const LogInIcon:  React.FC<Prop> = ({color, size, line, padding}) => {
  const AppIcon = () => (
        <LoginOutlined
            style={{
                color: `${color}`,
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: `${size}`,
                lineHeight: `${line}`,
                padding: `${padding}`,
            }}
        />	
  );
  return <AppIcon/>;
};

export default LogInIcon;
