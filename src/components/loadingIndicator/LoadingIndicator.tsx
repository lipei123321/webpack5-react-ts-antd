/**
 *  @fileOverview 页面加载中组件
 *
 *  @author lp
 */
import React from 'react';
import styled from 'styled-components';
import DivEle from './DivEle';

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingDiv = styled.div`
  float: left;
  justify-content: center;
  display: flex;
  align-items: center;
`;
interface LoadingIndicatorBean {
  position?: string;
  style?: any;
}
const LoadingIndicator = ({ ...props }: LoadingIndicatorBean) => (
  <LoadingWrapper
    style={{
      ...props.style,
      position: props.position !== undefined ? 'relative' : 'absolute',
    }}
  >
    <LoadingDiv>
      <DivEle second={-0.3} />
      <DivEle second={-0.25} />
      <DivEle second={-0.2} />
      <DivEle second={-0.1} />
      <DivEle second={0} />
    </LoadingDiv>
  </LoadingWrapper>
);

export default LoadingIndicator;
