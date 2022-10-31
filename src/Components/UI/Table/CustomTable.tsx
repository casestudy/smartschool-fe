import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Table } from 'antd';
import { TableStyles } from './Styles';

interface Prop {
	source?: any,
    columns?: any,
	pagination?: any,
	onRow?: any,
	expandable?: any,
	expandRowByClick?: any,
	showHeader?: any,
	rowKey?: any,
	rowSelection?: any,
	scroll?: any,
}

const CustomTable: React.FC<Prop> = ({
	source,
	columns,
	pagination,
	onRow,
	expandable,
	expandRowByClick,
	showHeader,
	rowKey,
	scroll
}) => {
	return (
		<>
			<TableStyles/>
			<StyledTable 
				columns = {columns} 
				dataSource = {source}
				expandable = {expandable}
				expandRowByClick = {expandRowByClick}
				showHeader = {showHeader}
				rowKey = {rowKey}
				{...{ pagination, onRow }}
				rowClassName = {(record, index) => 'table-custom-row'}
				scroll = {scroll}
			/>
		</>
	);
};

const StyledTable = styled(Table)``;

export default CustomTable;