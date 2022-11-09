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
	onFilter: any,
}

const CustomModal: React.FC<Prop> = ({visible, title, okText, columns, onOk, onCancel, source, tableKey, onFilter, okDisabled}) => {    
    return (
        <>
			<ModalStyles/>
			<Modal title={title}
					open={visible} 
					onOk={onOk} 
					onCancel={onCancel}
					okType='danger'
					okText={okText}
					okButtonProps = {{style: {backgroundColor: '#BC6470', borderRadius: '8px', fontWeight: 800, color: '#FFF'}, disabled: okDisabled}}
					cancelButtonProps={{style: {backgroundColor: '#8C8C8C', borderRadius: '8px', fontWeight: 800, color: '#FFF'}}}
					
			>
				{<CustomTable columns={columns} source={source} rowKey={tableKey} filter={onFilter} />}
			</Modal>
        </>
        
    );
};
    
export default CustomModal;