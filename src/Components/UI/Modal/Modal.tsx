import React, { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { Divider, Modal, Radio, RadioChangeEvent, Space, Spin, Table, Typography } from 'antd';
import { ModalStyles } from './Styles';

import CustomTable from '../../../Components/UI/Table/CustomTable';
import styled from 'styled-components';

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

	display?: string,
	columnsC?: any,
	sourceC?: any,
	tableKeyC?: string
	onFilterC?: any,
	radio?: boolean,
	radioChanged?: any
}

const { Title } = Typography;

const CustomModal: React.FC<Prop> = ({visible, title, okText, columns, onOk, onCancel, onClose, source, tableKey, onFilter, okDisabled, spin, spinMessage, width, okColor, okDisplay, columnsC, sourceC, onFilterC, tableKeyC, display, radio, radioChanged}) => {    
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
							<Flex>
								{((radio === undefined) || !radio)? 
									<CustomTable columns={columns} source={source} rowKey={tableKey} filter={onFilter} searchIconColor={okColor} />
								:
									<Radio.Group onChange={radioChanged} style={{width: '100%'}}>
										<Space direction="vertical" style={{width: '100%'}}>
											<CustomTable columns={columns} source={source} rowKey={tableKey} filter={onFilter} searchIconColor={okColor} />
										</Space>
									</Radio.Group>
								}
							</Flex>

							<Flex style={{display: display === undefined? 'none': display}}>
								<Divider
									type="horizontal"
									style={{
										backgroundColor: okColor,
										height: "0.1rem",
										marginTop: "2rem",
									}}
								/>
								<Title style={{fontSize: '1.2rem', fontWeight: '700', paddingBottom: '2rem'}}>Select Clasrooms</Title>
								{<CustomTable columns={columnsC} source={sourceC} rowKey={tableKeyC} filter={onFilterC} searchIconColor={okColor}/>}
							</Flex>
					</Spin>
				</Modal>			
        </>
        
    );
};

const Flex = styled.div``

export default CustomModal;