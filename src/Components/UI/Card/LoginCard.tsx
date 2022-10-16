import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';

import LoginForm from '../../Form/LoginForm';

interface Prop {
  
}

const LoginCard: React.FC<Prop> = () => (
    <>
		<Card title="User login" size='small' extra={<Link style={{color: 'white', fontWeight: 'bold'}} to="/chpwd">Change password</Link>} style={{ width: 500, border: '2px solid #dcdcdc'}} headStyle={{background: '#007bff', color: 'white', textAlign: 'left', fontWeight: 'bold'}}>
				<LoginForm/>
		</Card>
    </>
  );
  
  export default LoginCard;