/**
 *  @fileOverview Icon组件：SVG图标
 *
 *  @author lipei
 */
import { omit } from 'lodash-es';
import React from 'react';

/* eslint-disable react/prop-types */
const IconSvg = (props: any) => {
  const nextProps = omit(props, ['color', 'marginRight', 'size']);
  return (
    <div
      style={{
        fill: 'color:#A2B0C4',
        filter: props.color && `drop-shadow(${props.color} 80px 0)`,
        transform: props.color && 'translateX(-80px)',
        marginRight: props.marginRight ? props.marginRight : 5,
        fontSize: props.size ? props.size : 16,
      }}
      className="svg-icon"
      aria-hidden="true"
      {...nextProps}
    >
      <img alt="" src={require(`../../styles/assets/iconsvg/${props.type}.svg`)} />
    </div>
  );
};

export default IconSvg;
