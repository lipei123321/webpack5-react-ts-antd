import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import IconSvg from '@/components/Icon/IconSvg';
import HeaderMenu from './HeaderMenu';
import AvatarDropdown from './AvatarDropdown';

const Wrapper = styled.div`
  header {
    padding: 0 40px 0 32px;
    display: flex;
  }
  .logo__wrapper {
    width: 200px;
    display: flex;
  }
  .logo {
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }
  .header-menu__container {
    display: flex;
    height: 64px;
    margin-left: 100px;
    width: 100%;
  }
  .gqhma {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 0px;
  }
`;

const { Header } = Layout;

const HeaderCustom = () => (
  <Wrapper>
    <Header className="custom-theme header">
      <div className="logo__wrapper">
        <IconSvg type="icon-logo" size={16} marginRight={0} />
        <span style={{ color: '#ffffff', fontSize: '16px', padding: '0px 0px 0px 8px' }}>
          {process.env._SETTING_SYS_TITLE ? process.env._SETTING_SYS_TITLE : 'lp程序员训练基地'}
        </span>
      </div>
      <div className="header-menu__container">
        <HeaderMenu />
      </div>
      <AvatarDropdown />
    </Header>
  </Wrapper>
);

export default HeaderCustom;
