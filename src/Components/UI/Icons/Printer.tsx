import React from 'react';
import { PrinterOutlined } from '@ant-design/icons';

interface Prop {
	color?: string
  padding?: string
}

const PrinterIcon: React.FC <Prop> = ({color, padding}) => {
  const PrinterIcon = () => (
        <PrinterOutlined
            style={{
                color: color !== undefined? color : "#fff",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "20px",
                lineHeight: "33px",
                padding: padding !== undefined? `${padding} 0 0 0` :"0.5rem 0 0 0"
            }}
        />	
  );
  return <PrinterIcon/>;
};

export default PrinterIcon;
