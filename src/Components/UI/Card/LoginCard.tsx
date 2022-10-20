import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Col, Row} from 'antd';

import LoginForm from '../../Form/LoginForm';

interface Prop {
  
}

const LoginCard: React.FC<Prop> = () => (
    <>
		<Row justify='center'>
			<Col md={8}>
				<Card title="User login" size='default' extra={<Link style={{ color: 'white', fontWeight: 'bold'}} to="/chpwd">Change password</Link>} style={{ width: 500, marginTop: 'calc(25vh)', border: '2px solid #dcdcdc'}} headStyle={{background: '#007bff', color: 'white', textAlign: 'left', fontWeight: 'bold'}}>
					<LoginForm/>
				</Card>
			</Col>
		</Row>
    </>
  );
  
  export default LoginCard;