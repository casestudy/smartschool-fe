import React, { ReactNode } from 'react';

import { Select } from 'antd';
import Label from '../Label/Label';

const { Option } = Select;

interface Prop {
	
}

const App: React.FC<Prop> = () => (
    <>
		<Label value='Show'/>
		<Select defaultValue="10" style={{ width: 70 }}>
			<Option value="10">10</Option>
			<Option value="25">25</Option>
			<Option value="50">50</Option>
			<Option value="100">100</Option>
		</Select>
		<Label value='entries'/>
    </>
);
  
export default App;