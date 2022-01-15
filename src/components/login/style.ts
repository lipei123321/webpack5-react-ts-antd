import styled from 'styled-components';
import indexBG from '@/styles/assets/images/login/BG@2x.png';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex: 1 1 auto;
`;

export const LoginWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const LoginLeftWrapper = styled.div`
  background: url(${indexBG}) no-repeat 45% 50%;
  flex: 39;
  background-size: cover;
  .company-logo-container {
    display: flex;
    padding-top: 30px;
    padding-left: 30px;
  }
`;

export const LoginRightWrapper = styled.div`
  position: relative;
  flex: 25;
  display: flex;
  justify-content: center;
  align-items: center;
  .right__top-wrapper {
    font-size: 16px;
    width: 52%;
  }
  .right__login-form {
    margin-top: 30px;
  }
  .right__top-line1 {
    font-size: 25px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 20px;
    font-weight: 500;
  }
  .right__top-line2 {
    display: flex;
    span {
      font-weight: 500;
      text-align: center;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      padding: 0 10px;
      white-space: nowrap;
      color: #147bd1;
    }
  }
  .right__bottom-line1 {
    position: absolute;
    width: 300px;
    text-align: center;
    margin-left: -150px;
    bottom: 55px;
    left: 50%;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
  }
  .right__bottom-line2 {
    position: absolute;
    width: 300px;
    text-align: center;
    margin-left: -150px;
    left: 50%;
    bottom: 35px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
  }
  .login-form {
    margin-top: 24px;
  }
  .login-no-account {
    text-align: center;
  }
  .remember-line__wrapper {
    width: 300px;
    display: flex;
    justify-content: space-between;
  }

  .forget-psw {
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-top: 3px;
  }

  .forget-psw-txt {
    cursor: pointer;
  }
`;
