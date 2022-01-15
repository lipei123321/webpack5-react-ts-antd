import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
  .login-form {
    width: 320px;
    height: 340px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    background: #fff;
    .login-logo {
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin-bottom: 24px;
      span {
        vertical-align: text-bottom;
        font-size: 16px;
        text-transform: uppercase;
        display: inline-block;
      }
    }
  }
`;

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;
`;
