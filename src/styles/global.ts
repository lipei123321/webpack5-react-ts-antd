import { createGlobalStyle, css } from 'styled-components';
import { color, typography } from './styles';

export const bodyStyles = css`
  font-family: ${typography.type.primary};
  font-size: 12px;
  color: ${color.darkest};

  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;

  * {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${typography.weight.regular};
    margin: 0;
    padding: 0;
  }

  button,
  input,
  textarea,
  select {
    font-family: ${typography.type.primary};
  }

  sub,
  sup {
    font-size: 0.8em;
  }

  sub {
    bottom: -0.2em;
  }

  sup {
    top: -0.2em;
  }

  b,
  em {
    font-weight: ${typography.weight.bold};
  }

  hr {
    border: none;
    border-top: 1px solid ${color.border};
    clear: both;
    margin-bottom: 1.25rem;
  }

  code,
  pre {
    font-family: ${typography.type.code};
    font-size: ${typography.size.s2 - 1}px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    display: inline-block;
    padding-left: 2px;
    padding-right: 2px;
    vertical-align: baseline;
    color: ${color.secondary};
  }

  pre {
    line-height: 18px;
    padding: 11px 1rem;
    white-space: pre-wrap;
    background: rgba(0, 0, 0, 0.05);
    color: ${color.darkest};
    border-radius: 3px;
    margin: 1rem 0;
  }

  &.ReactModal__Body--open {
    overflow: hidden;
    &.hide-intercom #intercom-container {
      display: none;
    }
  }

  .ReactModalPortal > div {
    opacity: 0;
  }

  .ReactModalPortal .ReactModal__Overlay {
    transition: all 200ms ease-in;

    &--after-open {
      opacity: 1;
    }
    &--before-close {
      opacity: 0;
    }
  }
`;

export const GlobalStyle = createGlobalStyle`
  body {
    ${bodyStyles}
  }
  body,html {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height:auto;
    min-height:100%;
  }
  #root{
    min-height:100%;
    display:flex;
    flex-grow: 1;
  }
  .app_layout_container{
    flex-grow:1;
  }
  .app_layout_content{
    margin: 0 16px;
    overflow: initial;
    flex: 1 1;
    min-height: auto;
  }
  .app_layout_content2{
    margin: 0 0px;
    overflow: initial;
    flex: 1 1;
    min-height: auto;
  }
  // prevent mouse-clicks from focusing elements
  // this removes the ugly blue outline
  :focus:not(:focus-visible) {
    outline: none;
  }

  /* 设置滚动条的样式 */
  /* 滚动槽（轨道）宽高 */
  ::-webkit-scrollbar {
      width: 6px; /*对垂直流动条有效*/
      height: 6px; /*对水平流动条有效*/
  }
  /* 滚动槽（轨道）样式 */
  ::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 6px;
    background-color: #F5F5F5;
  }

  /*定义滑块颜色、内阴影及圆角*/
  ::-webkit-scrollbar-thumb{
      border-radius: 6px;
      box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #E8E8E8;
  }

  /*定义两端按钮的样式*/
  ::-webkit-scrollbar-button {
  }

  /*定义右下角汇合处的样式*/
  ::-webkit-scrollbar-corner {
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background-color: #555;
  }
`;
/** 颜色常量 */
const colorMap = {
  main: '#147BD1', // 主色 亚信蓝

  // 状态色
  success: '#6dc41f', // 成功色
  sub_success: (opacity: any) => `rgba(109,196,31,${opacity})`, // 成功辅助色
  error: '#d11429', // 错误色
  sub_error: (opacity: any) => `rgba(209,20,41,${opacity})`, // 错误辅助色
  warn: '#eda30f', // 警示色
  sub_warn: (opacity: any) => `rgba(237,163,15,${opacity})`, // 警示辅助色
  info: '#147bd1', // 信息色
  sub_info: (opacity: any) => `rgba(20,123,209,${opacity})`, // 信息辅助色
  invalid: '#a0a0a0',
  invalid_info: (opacity: any) => `rgba(0,0,0,${opacity})`, // 信息辅助色
};
export { colorMap };
