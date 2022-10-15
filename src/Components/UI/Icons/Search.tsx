import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

const SearchIcon: React.FC = () => {
  const SearchIcon = () => (
        <SearchOutlined
            style={{
                color: "#fff",
                fontFamily: "Open Sans",
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "20px",
                lineHeight: "33px",
                padding: "0.5rem 0 0 0"
            }}
        />	
  );
  return <SearchIcon/>;
};

export default SearchIcon;
