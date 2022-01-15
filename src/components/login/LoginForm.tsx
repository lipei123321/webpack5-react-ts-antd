import React, { useState } from 'react';
import { LockOutlined, UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Alert, Modal } from 'antd';
import { useHistory } from 'react-router';
import { login } from '@/services/loginService';
import { encryptionPwd, setToken } from '@/utils/auth';
import { getHome } from '@/routes/routeHelper';
import LoginSimpleVerify from './LoginSimpleVerify/LoginSimpleVerify';
import { useSetRecoilState } from 'recoil';
import { get } from 'lodash-es';
import { userState } from '@/store/atoms/userAtom';
const FormItem = Form.Item;
const InputPassWord = Input.Password;
const { warning } = Modal;
const LoginForm = () => {
  const setUserState = useSetRecoilState(userState);
  const history = useHistory();
  const [form] = Form.useForm();
  const [remember, setRemember] = useState(true);
  const [isVerify, setVerify] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [verifyBorderColor, setVerifyBorderColor] = useState('#e4e4e4');

  const handleRememberChange = (e: any) => {
    const { value } = e.target;
    setRemember(value);
  };

  const verifySuccess = () => {
    setVerify(true);
    setVerifyBorderColor('#e4e4e4');
  };

  const onFinish = () => {
    if (!isVerify) {
      setVerifyBorderColor('#f5222d');
      return;
    }
    let values = form.getFieldsValue(true);
    let { userId, password, remember } = values;
    password = encryptionPwd(password);
    login({ userId, password })
      .then((res) => {
        setErrMsg('');
        const token = `${res.data}`;
        setToken(token);
        setUserState(get(res, 'data.userInfo'));
        if (remember) {
          localStorage.setItem('base.userId', userId);
        } else {
          localStorage.removeItem('base.userId');
        }
        history.push(getHome.home());
      })
      .catch((error) => {
        setErrMsg(error.msg);
      });
  };

  const handleForgetPwd = () => {
    warning({
      title: '忘记密码？请联系管理员。',
      icon: <QuestionCircleOutlined />,
      okText: '确定',
    });
  };

  const itemStyle = { width: 300 };

  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember, userId: localStorage.getItem('FED.userId') }}
      onFinish={onFinish}
    >
      <FormItem name="userId" rules={[{ required: true, message: '请输入账号!' }]}>
        <Input
          style={itemStyle}
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入账号"
          size="large"
        />
      </FormItem>

      <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
        <InputPassWord
          style={itemStyle}
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="请输入密码"
          size="large"
        />
      </FormItem>

      <FormItem style={{ marginBottom: 16 }}>
        <LoginSimpleVerify borderColor={verifyBorderColor} success={verifySuccess} />
      </FormItem>

      {errMsg && <Alert message={errMsg} type="error" showIcon />}

      <FormItem name="remember" valuePropName="checked">
        <div className="remember-line__wrapper">
          <Checkbox onChange={handleRememberChange} checked={remember}>
            记住账号
          </Checkbox>
          <div className="forget-psw">
            <span className="forget-psw-txt" onClick={handleForgetPwd}>
              忘记密码？
            </span>
          </div>
        </div>
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit" style={itemStyle} size="large">
          登录
        </Button>
      </FormItem>
    </Form>
  );
};

export default LoginForm;
