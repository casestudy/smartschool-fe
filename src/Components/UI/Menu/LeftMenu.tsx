import React from "react"

import { Menu } from "antd";
import type { MenuProps } from 'antd';

import Search from '../Icons/Search';
import Dashboard from '../Icons/Dashboard';
import UserGroup from '../Icons/UserGroup';
  
interface Prop {
    collapsed: boolean,
}

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
  ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <Search />),
    getItem('Option 2', '2', <Dashboard />),
    getItem('Option 3', '3', <UserGroup />),
  
    getItem('Navigation One', 'sub1', <Dashboard />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  
    getItem('Navigation Two', 'sub2', <Dashboard />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
  
      getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
];


const LeftMenu: React.FC<Prop> = ({collapsed}) => {
    return (
        <>
            <div style={{ width: 256 }}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={items}
                />
            </div>
        </>
    );
};
    
export default LeftMenu;