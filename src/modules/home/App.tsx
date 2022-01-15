import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Redirect } from 'react-router-dom';
import HeaderCustom from './HeaderCustom';
import { UserOutlined } from '@ant-design/icons';
import Routes from '@/routes';
import { getToken } from '@/utils/auth';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
const { Sider, Content } = Layout;
import styled from 'styled-components';

const { SubMenu } = Menu;
const AppWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const App = () => {
  return (
    <Layout>
      <HeaderCustom />
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="测试路由">
              <Menu.Item key="1">路由1</Menu.Item>
              <Menu.Item key="2">路由2</Menu.Item>
              <Menu.Item key="3">路由3</Menu.Item>
              <Menu.Item key="4">路由4</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const AppContainer = () => {
  //判断什么时候到登陆界面
  const token = getToken();
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <AppWrapper>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </AppWrapper>
  );
};

export default AppContainer;
