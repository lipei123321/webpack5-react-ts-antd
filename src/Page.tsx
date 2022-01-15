import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from '@/components/error/NotFound';
import NotPermission from '@/components/error/NotPermission';
import Login from '@/components/login/LoginPage';
import App from './modules/home/App';
import { getBase } from '@/routes/routeHelper';
import { GlobalStyle } from '@/styles/global';
import 'antd/dist/antd.css';
export default () => {
  return (
    <Router basename="/">
      <GlobalStyle />
      <Switch>
        <Route exact path="/" render={() => <Redirect to={getBase.base()} push />} />
        <Route path={getBase.base()} component={App} />
        <Route path="/404" component={NotFound} />
        <Route path="/403" component={NotPermission} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
