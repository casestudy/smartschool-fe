import React, { MouseEventHandler, ReactNode } from "react"
import { Button } from 'antd';
  
interface Prop {
    icon?: ReactNode;
    onClick?: MouseEventHandler;
    children?: React.ReactNode;
    top?: string,
    float?: any
}

const AddButton: React.FC<Prop> = ({ children, icon, onClick, top, float }) => {
    return (
        <>
            <Button
                icon={icon}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '40px',
                    height: '40px',
                    justifyContent: 'center',
                    background: '#BC6470',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '8px',
                    borderColor: '#BC6470',
                    float: float,
                    marginTop: top
                }}
            >
                {children}
            </Button>
        </>
    );
};
    
export default AddButton;