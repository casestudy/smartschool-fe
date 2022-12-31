import React from 'react';
import { PrinterOutlined } from '@ant-design/icons';

interface Prop {
	color?: string
}

const PrinterIcon: React.FC <Prop> = ({color}) => {
  const PrinterIcon = () => (
        <PrinterOutlined
            style={{
                color: color !== undefined? color : "#fff",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "20px",
                lineHeight: "33px",
                padding: "0.5rem 0 0 0"
            }}
        />	
  );
  return <PrinterIcon/>;
};

export default PrinterIcon;
