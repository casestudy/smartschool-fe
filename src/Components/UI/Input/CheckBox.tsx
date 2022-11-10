import React from 'react';
import { Checkbox } from 'antd';

interface Prop {
	onChange?: any;
}

const CheckboxField: React.FC <Prop> = ({onChange}) => (
    <>
		<Checkbox onChange={onChange}/>
	</>
) 

export default CheckboxField;