import React, { useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import barImage from './images/bar';
import successImage from './images/success';
import Wrapper from './style';

type IProps = {
  width?: number;
  height?: number;
  borderRadius?: number;
  borderColor?: string;
  bgColor?: string;
  movedColor?: string;
  tips?: string;
  successTips?: string;
  barBackground?: string;
  success: () => void;
};

const LoginSimpleVerify = (props: IProps) => {
  const {
    width = 300,
    height = 40,
    borderRadius = 4,
    borderColor = '#E4E4E4',
    bgColor = '#F2F3F5',
    movedColor = '#31c971',
    tips = '请按住滑块，拖动到最右边',
    successTips = '完成验证',
    barBackground = `url(${barImage})`,
    success,
  } = props;
  /** 是否滑入 */
  const [isMouseEnter, setMouseEnter] = useState(false);
  /** 滑动距离 */
  const [diff, setDiff] = useState(0);
  /** 起始鼠标位置 */
  const [x1, setX1] = useState(0);
  /** 鼠标是否按下 */
  const [isMousedown, setMousedown] = useState(false);
  /** 是否已经成功 */
  const [isSuccess, setSuccess] = useState(false);
  /** 最大滑动距离 */
  const max = width - 50;

  useEffect(() => {
    document.body.addEventListener('mousemove', mousemove);
    document.body.addEventListener('mouseup', mouseup);
    return () => {
      document.body.removeEventListener('mousemove', mousemove);
      document.body.removeEventListener('mouseup', mouseup);
    };
  });

  /**
   * 鼠标移入
   */
  const mouseenter = () => {
    if (isSuccess) {
      return;
    }
    setMouseEnter(true);
  };

  /**
   * 鼠标离开
   */
  const mouseleave = () => {
    if (isSuccess || isMousedown) {
      return;
    }
    setMouseEnter(false);
  };

  /**
   * 鼠标按下
   */
  const mousedown = (e: ReactMouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSuccess) {
      return;
    }
    setX1(e.nativeEvent.x);
    setMousedown(true);
  };

  /**
   * 鼠标移动
   */
  const mousemove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMousedown || isSuccess) {
      return;
    }
    let deviation = e.x - x1;
    if (deviation < 0) {
      deviation = 0;
    }
    if (deviation >= max) {
      deviation = max;
      setSuccess(true);
      success && success();
    }
    setDiff(deviation);
  };

  /**
   * 鼠标松开
   */
  const mouseup = () => {
    if (isSuccess) {
      return;
    }
    setMouseEnter(false);
    setMousedown(false);
    setDiff(0);
  };

  const style = {
    width,
    height,
    border: `${borderColor} 1px solid`,
    backgroundColor: bgColor,
    borderRadius,
  };
  /** 滑条盒子样式 */
  const slideBoxStyle = {
    borderRadius,
  };
  /** 成功图标 */
  const iconStyle = {
    background: `url(${successImage}) no-repeat`,
  };
  /** 滑条样式 */
  const slideStyle = {
    borderRadius,
    background: movedColor,
    left: 50 - width,
    opacity: isMouseEnter ? 1 : 0,
    transitionDuration: isMouseEnter || isMousedown ? '.3s' : '0s',
    transform: `translateX(${diff}px)`,
  };
  /** 滑块样式 */
  const barStyle = {
    background: barBackground,
    transitionDuration: isMouseEnter || isMousedown ? '.3s' : '0s',
    transform: `translateX(${diff - 2}px)`,
  };
  /** 成功文本样式 */
  const textStyle = {
    opacity: isSuccess ? 1 : 0,
    transitionDuration: isMouseEnter || isMousedown ? '.3s' : '0s',
  };
  return (
    <Wrapper style={style} className="simple-verify">
      <div className="verify-tips">{tips}</div>
      <div style={slideBoxStyle} className="verify-box">
        <div style={slideStyle} className="veriry-slide" />
      </div>
      <div className="verify-bar" onMouseEnter={mouseenter} onMouseLeave={mouseleave} onMouseDown={mousedown}>
        <div style={barStyle} className="icon" />
      </div>
      <div style={textStyle} className="verify-success-tips">
        <span style={iconStyle} />
        {successTips}
      </div>
    </Wrapper>
  );
};

export default LoginSimpleVerify;
