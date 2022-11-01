import React, { ReactNode } from 'react';
import { Form } from 'antd';

import Input from '../Input/InputField';

import SearchIcon from '../Icons/Search' ;

interface Prop {
	label: ReactNode;
	change?: any;
}

const FormInputField: React.FC<Prop> = ({label, change}) => (
  	<>
		<Form>
			<Form.Item label={label}>
				<Input size='middle' holder='Search' suffix={<SearchIcon color='#bc6470'/>} style={{borderRadius: '8px', border: '0px white'}} onChange={(e:any) => change(e.target.value)} prefix/>
			</Form.Item>
		</Form>
  	</>
);

export default FormInputField;