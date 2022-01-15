import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Page from '@/Page';
import { RecoilRoot } from 'recoil';
const render = (Component: React.ComponentType) => {
  ReactDOM.render(
    <RecoilRoot>
      <Component />
    </RecoilRoot>,
    document.querySelector('#root')
  );
};
render(Page);
