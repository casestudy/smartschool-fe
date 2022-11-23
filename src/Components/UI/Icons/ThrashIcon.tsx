import React from 'react';
import { DeleteFilled } from '@ant-design/icons';

interface Prop {
	color?: string;
	size?: string;
	line?: string;
}

const PenIcon: React.FC<Prop> = ({color, size, line}) => {
  const AppIcon = () => (
        <DeleteFilled
            style={{
                color: color !== undefined? color : "#D83031",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: size !== undefined? size : "18px",
            }}
        />	
  );
  return <AppIcon/>;
};

export default PenIcon;
