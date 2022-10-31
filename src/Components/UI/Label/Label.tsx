import React from "react"
import { Typography } from 'antd';
  
interface Prop {
    value: string
}

const { Text } = Typography;

const Label: React.FC<Prop> = ({value}) => {
    return (
        <>
            <Text
                style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 800,
                    fontSize: "14px",
                    // lineHeight: "33px",
                    padding: "0 0.5rem 0 0.5rem"
                }}
            >{value}</Text>
        </>
    );
};
    
export default Label;