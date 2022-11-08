import React from "react"
import { Typography } from 'antd';
  
interface Prop {
    value: string
}

const { Text } = Typography;

const Title: React.FC<Prop> = ({value}) => {
    return (
        <>
            <Text
                style={{
                    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "1rem",
                }}
            >{value}<br /><br /></Text>
        </>
    );
};
    
export default Title;