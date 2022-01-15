import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import { IFMenu } from './config';
import routes from './module';
import { getToken } from '../utils/auth';
import { TestHome } from '@/modules';
import RouteWrapper from './RouteWrapper';
const CRouter = () => {
  const requireAuth = (component: React.ReactElement) => {
    if (!component) return <Redirect to="/404" />;
    return component;
  };
  const requireLogin = (component: React.ReactElement) => {
    //验证是否需要从新登陆
    const token = getToken();
    if (!token) {
      return <Redirect to="/login" />;
    }
    return requireAuth(component) || component;
  };

  const createMenu = (r: IFMenu) => (
    <Route
      key={r.path || r.path}
      exact={r.exact || r.exact}
      path={r.path || r.path}
      render={(props: any) => {
        // 重新包装组件
        const wrapper = <RouteWrapper {...{ ...props, Comp: r.component, route: r }} />;
        return requireLogin(wrapper);
      }}
    />
  );

  return (
    <Suspense fallback={<Spin />}>
      <Switch>
        {routes.map((route) => {
          return createMenu(route);
        })}
        <Route path="/son-app/home" component={TestHome} />
      </Switch>
    </Suspense>
  );
};

export default CRouter;
