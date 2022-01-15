import React from 'react';
import IconSvg from '@/components/Icon/IconSvg';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import { getToken } from '@/utils/auth';
import { Container, LoginWrapper, LoginLeftWrapper, LoginRightWrapper } from './style';
import { getBase } from '@/routes/routeHelper';
const LoginPage = () => {
  const token = getToken();
  if (token) {
    return <Redirect to={getBase.base()} />;
  }
  return (
    <Container>
      <LoginWrapper>
        <LoginLeftWrapper>
          <div className="company-logo-container">
            <IconSvg type="icon-logo" size={16} marginRight={0} />
            <span style={{ color: '#ffffff', fontSize: '16px', padding: '0px 0px 0px 8px' }}>
              {process.env._SETTING_SYS_TITLE ? process.env._SETTING_SYS_TITLE : '亚信科技AI单点平台'}
            </span>
          </div>
        </LoginLeftWrapper>
        <LoginRightWrapper>
          <div className="right__top-wrapper">
            <div className="right__top-line1">您好！</div>
            <div className="right__top-line2">
              欢迎登录 <span>程序员登陆</span> 系统
            </div>
            <div className="right__login-form">
              <LoginForm />
            </div>
          </div>
          <div className="right__bottom-line1">© 2020 lp有限公司</div>
          <div className="right__bottom-line2">A Product of lp</div>
        </LoginRightWrapper>
      </LoginWrapper>
    </Container>
  );
};

export default LoginPage;
