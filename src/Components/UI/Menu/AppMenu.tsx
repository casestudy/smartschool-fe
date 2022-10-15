import React from "react"
import { Col, Row } from 'antd';

import './AppMenu.css';
  
interface Prop {
	height: string;
	visibility: DocumentVisibilityState;
}



const LeftMenu: React.FC<Prop> = ({height, visibility}) => {
    return (
        <>
            <div style={{
					overflow: "hidden", 
					position: "absolute", 
					top: "0px", 
					width: "328px", 
					zIndex: "911", 
					height: `${height}`, 
					marginTop: "57px", 
					right: "0px", 
					marginRight: "4px", 
					visibility: `${visibility}`, 
					border: "2px solid black",
					borderRadius: "15px",
					maxHeight: "calc(-65px + 100vh)"}}>
				
                <Row>
					<Col span={8} className="gutter-row">Admnis</Col>
					<Col span={8} className="gutter-row">Teachers</Col>
					<Col span={8} className="gutter-row">Students</Col>
				</Row>
            </div>
        </>
    );
};
    
export default LeftMenu;