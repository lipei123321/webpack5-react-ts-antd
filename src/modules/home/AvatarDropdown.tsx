import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { AvatarWrapper } from './styled';
import { removeToken } from '@/utils/auth';
import { useHistory } from 'react-router-dom';
import userPng from '@/styles/assets/images/user.png';
import { userInfoQuery } from '@/store/selectors/userSelector';
import { get } from 'lodash-es';
import { useRecoilValue } from 'recoil';
const MenuItem = Menu.Item;
export type GlobalHeaderRightProps = {
  menu?: boolean;
};

interface MenuClickEventHandler {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

const AvatarDropdown = () => {
  let history = useHistory();
  const userInfo = useRecoilValue(userInfoQuery);
  const onMenuClick = (event: MenuClickEventHandler) => {
    const { key } = event;
    switch (key) {
      case 'logout':
        handleLogout();
        break;
      default:
    }
  };

  const handleLogout = () => {
    removeToken();
    history.push('/login');
  };

  const menuHeaderDropdown = (
    <Menu className="user-menu__wrapper" selectedKeys={[]} onClick={onMenuClick}>
      <MenuItem key="center">
        <UserOutlined />
        {get(userInfo, 'userName')}
      </MenuItem>

      <MenuItem key="settings">
        <SettingOutlined />
        修改密码
      </MenuItem>
      <Menu.Divider />

      <MenuItem key="logout">
        <LogoutOutlined />
        退出登录
      </MenuItem>
    </Menu>
  );
  return (
    <AvatarWrapper>
      <Dropdown overlay={menuHeaderDropdown}>
        <span className="avatar__container">
          <Avatar src={userPng} style={{ backgroundColor: '#b0b0b0' }} size={32} />
        </span>
      </Dropdown>
    </AvatarWrapper>
  );
};

export default AvatarDropdown;
