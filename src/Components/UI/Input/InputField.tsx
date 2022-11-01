import React, { CSSProperties, ReactNode } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface Prop {
	size: SizeType;
	holder: string;
	type?: string;
	prefix?: ReactNode;
	suffix?: ReactNode;
	style?: CSSProperties;
	onChange?: any;
}

const App: React.FC<Prop> = ({size, holder, type, prefix, suffix, style, onChange}) => (
  <>
    	<Input type={type} size={size} placeholder={holder} prefix={prefix} suffix={suffix} style={style} onChange={onChange}/>
  </>
);

export default App;