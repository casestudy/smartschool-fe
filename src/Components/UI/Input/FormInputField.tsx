import React, { ReactNode } from 'react';
import { Form } from 'antd';

import Input from '../Input/InputField';

import SearchIcon from '../Icons/Search' ;

interface Prop {
	label: ReactNode;
	change?: any;
	icon?: string;
}

const FormInputField: React.FC<Prop> = ({label, change, icon}) => (
  	<>
		<Form>
			<Form.Item label={label}>
				<Input size='middle' holder='Search' suffix={<SearchIcon color={(icon === undefined)? '#bc6470' : icon}/>} style={{borderRadius: '8px', border: '0px white'}} onChange={(e:any) => change(e.target.value)} prefix/>
			</Form.Item>
		</Form>
  	</>
);

export default FormInputField;