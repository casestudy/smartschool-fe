import React from 'react';
import { EditOutlined } from '@ant-design/icons';

interface Prop {
	color: string;
	size: string;
	line: string;
}

const PenIcon: React.FC<Prop> = ({color, size, line}) => {
  const AppIcon = () => (
        <EditOutlined
            style={{
                color: `${color}`,
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: `${size}`,
            }}
        />	
  );
  return <AppIcon/>;
};

export default PenIcon;
