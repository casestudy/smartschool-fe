import React, { MouseEventHandler, ReactNode } from "react"
import { Button } from 'antd';
  
interface Prop {
    icon?: ReactNode;
    onClick?: MouseEventHandler;
}

const BackButton: React.FC<Prop> = ({ icon, onClick }) => {
    return (
        <>
            <Button
                icon={icon}
                style={{
                    display: 'flex',
                    border: 'none !important',
                    background: 'transparent !important'
                }}
                onClick={onClick}
                size='middle'
            />
        </>
    );
};
    
export default BackButton;