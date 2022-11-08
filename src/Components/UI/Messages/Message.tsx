import React from "react"
import { Typography } from 'antd';
  
interface Prop {
    value: string,
    item?: string,
    msg? : string,
    warn?: string,
}

const { Text } = Typography;

const Message: React.FC<Prop> = ({value, item, msg, warn}) => {
    return (
        <>
            <Text style={{fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif", fontSize: "0.8rem"}}>
                <Text style={{
                    fontStyle: "italic",
                    fontWeight: "bold"
                }}>{value}</Text>
            
                <Text style={{color: 'red',fontStyle: "italic", fontWeight: "bold"}}>{item? ': "' + item + '"?.' : ''}</Text>
                
                {msg? <Text style={{paddingTop: '3px'}}><br /><br />{msg}</Text> : ''}

                {warn? <Text style={{fontWeight: "bold"}}><br /><br /> {warn}</Text> : ''}

            </Text>
        </>
    );
};
    
export default Message;