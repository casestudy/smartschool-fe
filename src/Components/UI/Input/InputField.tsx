import React, { CSSProperties, ReactNode } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface Prop {
	size: SizeType;
	holder: string;
	type?: string;
	value?: any;
	prefix?: ReactNode;
	suffix?: ReactNode;
	style?: CSSProperties;
	onChange?: any;
	onKeyUp?: any;
}

const App: React.FC<Prop> = ({size, holder, type, value, prefix, suffix, style, onChange, onKeyUp}) => (
  <>
    	<Input type={type} size={size} defaultValue={value} placeholder={holder} prefix={prefix} suffix={suffix} style={style} onChange={onChange} onKeyUp={onKeyUp}/>
  </>
);

export default App;