import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Table, Row, Col } from 'antd';
import { TableStyles } from './Styles';

import Input from '../Input/InputField';
import FormInput from '../Input/FormInputField';
import Select from '../Input/SelectField';
import Label from '../Label/Label';

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
			<Row>
				<Col md={16}>
					<Select/>
				</Col>
				<Col md={8}>
					<FormInput label={<Label value='Search  '/>}/>
				</Col>
			</Row>
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