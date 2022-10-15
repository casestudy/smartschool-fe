import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const Menu: React.FC = () => {
  const MenuSvg = () => (
    <svg version="1.1" height="20" width="30" id="Capa_1" color='white' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 56 56">
        <g>
            <path fill="white" d="M8,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,40,8,40z"/>
            <path fill="white" d="M28,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,40,28,40z"/>
            <path fill="white" d="M48,40c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S52.411,40,48,40z"/>
            <path fill="white" d="M8,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,20,8,20z"/>
            <path fill="white" d="M28,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,20,28,20z"/>
            <path fill="white" d="M48,20c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S52.411,20,48,20z"/>
            <path fill="white" d="M8,0C3.589,0,0,3.589,0,8s3.589,8,8,8s8-3.589,8-8S12.411,0,8,0z"/>
            <path fill="white" d="M28,0c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S32.411,0,28,0z"/>
            <path fill="white" d="M48,16c4.411,0,8-3.589,8-8s-3.589-8-8-8s-8,3.589-8,8S43.589,16,48,16z"/>
        </g>
    </svg>
  );
  const MenuIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={MenuSvg} {...props} />
  );
  return <MenuIcon style={{ backgroundColor: 'transparent', borderRadius: "50px", color: "white" }} />;
};

export default Menu;
