/**
 *  @fileOverview 页面加载中组件：div子元素
 *
 *  @author lp
 */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const loadingKf = keyframes`
  0% {
      transform: scale(1, 0.3);
  }

  100% {
      transform: scale(1, 1);
    }
`;
const DivEle = (props: any) => {
  const DivAniEle = styled.div`
    animation: ${loadingKf} 0.5s ${props.second}s linear infinite;
    width: 5px;
    height: 35px;
    margin: 0 3px;
    background: #2196f3;
    border-radius: 2px;
    display: inline-block;
  `;
  return <DivAniEle />;
};

export default DivEle;
