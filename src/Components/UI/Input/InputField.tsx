import React, { ReactNode } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface Prop {
	size: SizeType;
	holder: string;
	type?: string;
	prefix: ReactNode;
}

const App: React.FC<Prop> = ({size, holder, type, prefix}) => (
  <>
    	<Input type={type} size={size} placeholder={holder} prefix={prefix} />
  </>
);

export default App;