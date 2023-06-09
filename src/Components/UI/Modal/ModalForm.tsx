import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { Divider, Modal, Radio, RadioChangeEvent, Space, Spin, Table, Typography } from 'antd';
import { ModalStyles } from './Styles';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import styled from 'styled-components';

interface Prop {
    visible: boolean,
    title: string,
    okText?: string,
	okDisabled: boolean,
    onOk: MouseEventHandler,
    onCancel: MouseEventHandler,
	onClose: any,
	spin: boolean,
	spinMessage: string,
	width?: number,
	okColor?: string
	okDisplay?: string,
	form: any
}

const { Title } = Typography;

const CustomModal: React.FC<Prop> = ({visible, title, okText, onOk, onCancel, onClose, okDisabled, spin, spinMessage, width, okColor, okDisplay, form}) => {    
    return (
        <>
				<ModalStyles/>
				<Modal title={title}
						open={visible} 
						onOk={onOk} 
						onCancel={onCancel}
						okType='danger'
						okText={okText}
						okButtonProps = {{style: {backgroundColor: okColor === undefined? '#BC6470' : okColor, borderColor: okColor === undefined? '#BC6470' : okColor, borderRadius: '8px', fontWeight: 800, color: '#FFF', display: okDisplay === undefined? 'inline' : okDisplay}, disabled: okDisabled}}
						cancelButtonProps={{style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}}}
						destroyOnClose={true}
						afterClose={onClose}
						width={width}
				>
					<Spin spinning={spin} tip={spinMessage}>
						{form}
					</Spin>
				</Modal>			
        </>
        
    );
};


export default CustomModal;