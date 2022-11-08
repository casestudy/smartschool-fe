import React, { MouseEventHandler, ReactNode } from "react"
import { Button } from 'antd';
import { SizeType } from "antd/es/config-provider/SizeContext";
  
interface Prop {
    title: string;
    disabled?: boolean;
    size?: SizeType;
    onClick?: MouseEventHandler;
    bgcolor?: string,
    icon?: ReactNode
}

const SaveButton: React.FC<Prop> = ({ title, disabled, size, onClick, bgcolor, icon }) => {
    return (
        <>
            <Button
                type="primary"
                htmlType="submit"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#FFF',
                    backgroundColor: `${bgcolor}`,
                    borderRadius: '8px',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 800
                }}
                onClick={onClick}
                size={size}
                disabled={disabled}
                icon={icon}
            >
                <span style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>{title}</span>
            </Button>
        </>
    );
};
    
export default SaveButton;