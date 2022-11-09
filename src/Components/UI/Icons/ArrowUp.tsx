import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const ArrowUp: React.FC = () => {
  const AdminSvg = () => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L12 20M12 4L18 10M12 4L6 10" stroke="#D83031" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const ArrowUpIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={AdminSvg} {...props} />
  );
  return <ArrowUpIcon style={{ backgroundColor: 'transparent', borderRadius: "50px"}} />;
};

export default ArrowUp;