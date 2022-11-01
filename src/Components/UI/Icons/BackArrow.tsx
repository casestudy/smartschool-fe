import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const BackIcon: React.FC = () => {
  const BarsSvg = () => (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.6585 9.88875H4.83438L11.7477 2.56875C12.3002 1.98375 12.3002 1.02375 11.7477 0.43875C11.1952 -0.14625 10.3027 -0.14625 9.75021 0.43875L0.414375 10.3237C-0.138125 10.9087 -0.138125 11.8537 0.414375 12.4387L9.75021 22.3237C10.3027 22.9087 11.1952 22.9087 11.7477 22.3237C12.3002 21.7387 12.3002 20.7937 11.7477 20.2087L4.83438 12.8887H20.6585C21.4377 12.8887 22.0752 12.2137 22.0752 11.3887C22.0752 10.5637 21.4377 9.88875 20.6585 9.88875Z"
        fill="#403B3B"
      />
    </svg>
  );
  const AppIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={BarsSvg} {...props} />
  );
  return <AppIcon style={{ backgroundColor: 'transparent' }} />;
};

export default BackIcon;