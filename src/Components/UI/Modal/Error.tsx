import React from 'react';
import { Button, Modal } from 'antd';

interface Prop {
    type: string,
    title: string,
    msg: string,
}

const Message: React.FC<Prop> = ({type, title, msg}) => {
	
	const modal = Modal.error({
		title: `${title}`,
		content: `${msg}`,
	});

    return (
        <></>
    );
};
    
export default Message;