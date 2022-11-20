import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { Modal, Spin, Table } from 'antd';
import { ModalStyles } from './Styles';

import CustomTable from '../../../Components/UI/Table/CustomTable';

interface Prop {
    visible: boolean,
    title: string,
    okText?: string,
    columns: any,
    source?: any,
	tableKey: string,
	okDisabled: boolean,
    onOk: MouseEventHandler,
    onCancel: MouseEventHandler,
	onClose: any,
	onFilter: any,
	spin: boolean,
	spinMessage: string,
	width?: number,
	okColor?: string
	okDisplay?: string,
}

const CustomModal: React.FC<Prop> = ({visible, title, okText, columns, onOk, onCancel, onClose, source, tableKey, onFilter, okDisabled, spin, spinMessage, width, okColor, okDisplay}) => {    
    return (
        <>
				<ModalStyles/>
				<Modal title={title}
						open={visible} 
						onOk={onOk} 
						onCancel={onCancel}
						okType='danger'
						okText={okText}
						okButtonProps = {{style: {backgroundColor: okColor === undefined? '#BC6470' : okColor, borderRadius: '8px', fontWeight: 800, color: '#FFF', display: okDisplay === undefined? 'inline' : okDisplay}, disabled: okDisabled}}
						cancelButtonProps={{style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}}}
						destroyOnClose={true}
						afterClose={onClose}
						width={width}
				>
					<Spin spinning={spin} tip={spinMessage}>
						{<CustomTable columns={columns} source={source} rowKey={tableKey} filter={onFilter} searchIconColor={okColor} />}
					</Spin>
					
				</Modal>			
        </>
        
    );
};
    
export default CustomModal;