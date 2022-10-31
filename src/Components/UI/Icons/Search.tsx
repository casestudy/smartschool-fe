import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

interface Prop {
	color?: string
}

const SearchIcon: React.FC <Prop> = ({color}) => {
  const SearchIcon = () => (
        <SearchOutlined
            style={{
                color: color !== undefined? color : "#fff",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "20px",
                // lineHeight: "33px",
                padding: "0.5rem 0.5rem 0.5rem 0.5rem"
            }}
        />	
  );
  return <SearchIcon/>;
};

export default SearchIcon;
