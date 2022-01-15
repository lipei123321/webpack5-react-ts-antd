import React, { useState } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IFMenu } from '@/routes/config';
import { get } from 'lodash-es';

const MenuItem = Menu.Item;
const { SubMenu } = Menu;
const Wrapper = styled.div`
  width: 100%;
  .ant-menu.ant-menu-dark,
  .ant-menu-dark .ant-menu-sub,
  .ant-menu.ant-menu-dark .ant-menu-sub {
    color: rgba(255, 255, 255, 0.65);
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    border-bottom: 3px solid #ffffff;
    height: 64px;
  }
  .ant-menu-dark.ant-menu-horizontal {
    border-bottom: 0;
  }
`;

const HeaderMenu = ({ ...props }) => {
  const [selectedKey, setSelectedKey] = useState<Array<string>>();
  const menuInfo = [
    {
      id: 'test1',
      name: '联邦学习',
      addition: { url: '/son-app/fed', moduleType: '1' },
    },
    {
      id: 'SYS_MGR',
      name: '系统管理',
      addition: { url: '', moduleType: '' },
      children: [
        {
          id: 'test2',
          name: 'ai平台',
          addition: { url: '/son-app/ai', moduleType: '1' },
        },
      ],
    },
  ];
  const renderMenuItemGroup = (data: Array<IFMenu>) =>
    data.map((item: IFMenu) => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu key={item.id as string} title={item.name}>
            {renderMenuItemGroup(item.children)}
          </SubMenu>
        );
      }
      return renderMenuItem(item);
    });
  const renderMenuItem = (item: IFMenu) => (
    <MenuItem key={item.id as string}>
      <Link
        to={get(item, 'addition.url')}
        onClick={() => {
          setSelectedKey([item.id as string]);
        }}
      >
        {item.name}
      </Link>
    </MenuItem>
  );
  return (
    <Wrapper>
      <Menu
        style={{ display: 'block', float: 'right', paddingRight: 100 }}
        theme="dark"
        mode="horizontal"
        {...props}
        selectedKeys={selectedKey}
      >
        {renderMenuItemGroup(menuInfo)}
      </Menu>
    </Wrapper>
  );
};

export default HeaderMenu;
