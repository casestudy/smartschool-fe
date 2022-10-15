import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const Request: React.FC = () => {
  const RequestSvg = () => (
    <svg version="1.1" id="_x31_" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="60" width="70"
    viewBox="0 0 128 128">
        <circle id="_x32_" cx="79.2" cy="42.6" r="9.6"/>
        <path id="_x31__1_" d="M51.2,65.2l18.5,4.9c1.2,0.4,2.3,0.1,3.2-0.4l9.7-5.6v21.5H63.5c-1.4,0-3,0.6-4.2,1.8
        c-1.2,1.1-1.8,2.6-1.8,4.2l0,0v25.4c0,3.4,2.6,6,6,6c3.4,0,6-2.6,6-6V97.7h13.2v19.3c0,1.4,0.6,3,1.8,4.2c1.1,1.2,2.6,1.8,4.2,1.8
        l0,0H114c3.4,0,6-2.6,6-6s-2.6-6-6-6H94.8v-14c2.8-1.1,4.8-3.5,5.6-6.3c1.6-6.6,2.4-13.5,2.4-20.6c0-0.5,0-1.7,0-1.8
        c0-8-5.7-14.6-13.4-15.9c-0.1,0-1-0.1-1.2-0.1c-1,0-1.8,0.2-2.6,0.7l0,0l-15.1,8.7l-16.9-4.5c-2.3-0.6-4.5,0.7-5.1,3
        C47.8,62.2,49.2,64.6,51.2,65.2z"/>
        <g>
        <circle cx="20.6" cy="14.3" r="9.9"/>
        <path d="M17.5,26.6c0.2,0,1.2,0.1,1.2,0.1c7.8,1.4,13.8,8.2,13.8,16.4c0,0.1,0.1,1.4,0,1.9c0,7.3-0.9,14.5-2.5,21.3
            c-0.5,2-1.7,3.8-3.3,5.1v45.5c0,3.5-2.7,6.2-6.2,6.2c-3.5,0-6.2-2.7-6.2-6.2v-41c0.6,0.1,1.2,0.2,1.9,0.2c2.2,0,4.1-1,5.3-2.5
            c0.9-1.2,1.5-2.7,1.5-4.3V41.5c0-0.7-0.5-1.2-1.2-1.2c-0.7,0-1.2,0.5-1.2,1.2v27.8c0,2.3-2,4.3-4.3,4.3c-2.3,0-4.3-2-4.3-4.3
            c0,0,0-37,0-37.1C11.9,29.1,14.4,26.6,17.5,26.6z"/>
        </g>
    </svg>
  );
  const RequestIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={RequestSvg} {...props} />
  );
  return <RequestIcon style={{ backgroundColor: 'transparent', borderRadius: "50px"}} />;
};

export default Request;