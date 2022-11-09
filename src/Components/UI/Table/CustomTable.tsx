import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { Table, Row, Col } from 'antd';
import { TableStyles } from './Styles';

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
	filter?: any
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
	scroll,
	filter
}) => {
	const [perPage, setPerPage] = useState(5);

	const handleChange = (value: number) => {
		setPerPage(value);
	};
	
	return (
		<>
			<TableStyles/>
			<Row>
				<Col md={16} sm={12}>
					<Select handleChange={handleChange}/>
				</Col>
				<Col md={8} sm={12}>
					<FormInput label={<Label value='Search  '/>} change={filter}/>
				</Col>
			</Row>
			<Row>
				<Col md={24}>
					<StyledTable 
						columns = {columns} 
						dataSource = {source}
						expandable = {expandable}
						expandRowByClick = {expandRowByClick}
						showHeader = {showHeader}
						rowKey = {rowKey}
						pagination={{position: ['bottomCenter'], pageSize: perPage, size: 'small'}}
						rowClassName = {(record, index) => 'table-custom-row'}
						scroll = {scroll}
					/>
				</Col>
			</Row>
		</>
	);
};

const StyledTable = styled(Table)``;

export default CustomTable;