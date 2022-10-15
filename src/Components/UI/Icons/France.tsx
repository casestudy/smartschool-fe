import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const FranceIcon: React.FC = () => {
  const FranceSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" height="13" width="25" viewBox="0 0 3 2"><path fill="#EC1920" d="M0 0h3v2H0z"/><path fill="#fff" d="M0 0h2v2H0z"/><path fill="#051440" d="M0 0h1v2H0z"/></svg>
  );
  const AppIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={FranceSvg} {...props} />
  );
  return <AppIcon style={{ backgroundColor: 'transparent', borderRadius: "50px" }} />;
};

export default FranceIcon;
