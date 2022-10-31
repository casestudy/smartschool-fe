import React, { ReactNode } from 'react';
import { Form } from 'antd';

import Input from '../Input/InputField';

import SearchIcon from '../Icons/Search' ;

interface Prop {
	label: ReactNode;
}

const FormInputField: React.FC<Prop> = ({label}) => (
  	<>
		<Form
		
		>
			<Form.Item label={label}>
				<Input size='middle' holder='Search' suffix={<SearchIcon color='#bc6470'/>} style={{borderRadius: '8px', border: '0px white'}} prefix/>
			</Form.Item>
		</Form>
  	</>
);

export default FormInputField;