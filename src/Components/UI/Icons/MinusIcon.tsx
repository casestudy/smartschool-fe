import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const MinusIcon: React.FC = () => {
  const MinusSvg = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14 11H6C5.45 11 5 10.55 5 10C5 9.45 5.45 9 6 9H14C14.55 9 15 9.45 15 10C15 10.55 14.55 11 14 11Z"
        fill="#FFFFFF"
      />
    </svg>
  );
  const AppIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={MinusSvg} {...props} />
  );
  return <AppIcon />;
};

export default MinusIcon;
