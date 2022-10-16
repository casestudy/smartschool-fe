import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'antd';

interface Prop {
  
}

const LoginCard: React.FC<Prop> = () => (
    <>
      <Card title="User login" size='small' extra={<Link style={{color: 'white'}} to="/chpwd">Change password</Link>} style={{ width: 600, border: '2px solid #dcdcdc'}} headStyle={{background: '#007bff', color: 'white', textAlign: 'left'}}>
        
      </Card>
    </>
  );
  
  export default LoginCard;