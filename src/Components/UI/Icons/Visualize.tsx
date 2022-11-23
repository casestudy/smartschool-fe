import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

interface Prop {
	color?: string;
}

const VisualizeIcon: React.FC<Prop> = ({color}) => {
  const ClockSvg = () => (
    <svg
      width="16"
      height="15"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3501 16H3.3501C2.8001 16 2.3501 15.55 2.3501 15V3C2.3501 2.45 2.8001 2 3.3501 2H8.3501C8.9001 2 9.3501 1.55 9.3501 1C9.3501 0.45 8.9001 0 8.3501 0H2.3501C1.2401 0 0.350098 0.9 0.350098 2V16C0.350098 17.1 1.2501 18 2.3501 18H16.3501C17.4501 18 18.3501 17.1 18.3501 16V10C18.3501 9.45 17.9001 9 17.3501 9C16.8001 9 16.3501 9.45 16.3501 10V15C16.3501 15.55 15.9001 16 15.3501 16ZM11.3501 1C11.3501 1.55 11.8001 2 12.3501 2H14.9401L5.8101 11.13C5.4201 11.52 5.4201 12.15 5.8101 12.54C6.2001 12.93 6.8301 12.93 7.2201 12.54L16.3501 3.41V6C16.3501 6.55 16.8001 7 17.3501 7C17.9001 7 18.3501 6.55 18.3501 6V1C18.3501 0.45 17.9001 0 17.3501 0H12.3501C11.8001 0 11.3501 0.45 11.3501 1Z"
        fill={color!== undefined? color : "#BC6470"}
      />
    </svg>
  );
  const AppIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={ClockSvg} {...props} />
  );
  return <AppIcon style={{ backgroundColor: 'transparent' }} />;
};

export default VisualizeIcon;