import React, { ChangeEventHandler, MouseEventHandler, ReactNode } from 'react';

import { Select } from 'antd';
import Label from '../Label/Label';

const { Option } = Select;

interface Prop {
	handleChange: any;
}

const App: React.FC<Prop> = ({handleChange}) => (
    <>
		<Label value='Show'/>
		<Select defaultValue={5} style={{ width: 70 }} onChange={handleChange}>
			<Option value={5}>5</Option>
			<Option value={10}>10</Option>
			<Option value={25}>25</Option>
			<Option value={50}>50</Option>
		</Select>
		<Label value='entries'/>
    </>
);
  
export default App;