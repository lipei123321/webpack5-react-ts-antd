import React from 'react';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Divider } from 'antd';
import { Link } from 'react-router-dom';
/* eslint-disable */

const MenuItem = Menu.Item;
const disabledColor = {
  color: 'rgba(0, 0, 0, 0.25)',
};
const normalColor = {
  color: 'rgba(0, 0, 0, 0.65)',
};

const ListButtonDom = styled.div``;

interface ListButtonsBean {
  buttons: Array<any>;
  maxShowNum: number;
}

const ListButtons = ({ ...props }: ListButtonsBean) => {
  const getLocationState = (item: any) => {
    let str = {} as any;
    if (item.state) {
      for (let key in item.state) {
        str[key] = item.state[key];
      }
    }
    return str;
  };
  const disabledFun = () => false;
  const getDropdown = (buttons: Array<any>, maxShowNum: number, parentIndex: number) => (
    <Dropdown
      key={parentIndex}
      overlay={
        <Menu>
          {buttons.map(
            (item, index) =>
              index >= maxShowNum &&
              (item.handleType && item.handleType === 'link' ? (
                <MenuItem key={`${parentIndex}-${index}`}>
                  <Link
                    style={item.disabled ? { ...disabledColor, ...item.style } : item.style}
                    to={{
                      pathname: item.handleAction,
                      state: getLocationState(item),
                    }}
                  >
                    {item.handleName}
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem key={`${parentIndex}-${index}`} onClick={item.disabled ? disabledFun : item.handleAction}>
                  <a style={item.disabled ? disabledColor : normalColor}>{item.handleName}</a>
                </MenuItem>
              ))
          )}
        </Menu>
      }
    >
      <a onClick={(e) => e.preventDefault()}>
        <Divider type="vertical" />
        更多
        <DownOutlined />
      </a>
    </Dropdown>
  );
  const { buttons, maxShowNum } = props;
  let maxShowNums = maxShowNum || 999;
  return (
    <ListButtonDom>
      <div style={{ display: 'flex' }}>
        {buttons.map((item, index) => {
          if (index === maxShowNums && buttons.length > maxShowNum + 1) {
            return getDropdown(buttons, maxShowNums, index);
          }
          if (index <= maxShowNums) {
            return item.handleType && item.handleType === 'link' ? (
              <Link
                key={index}
                style={item.style}
                to={{
                  pathname: item.handleAction,
                  state: getLocationState(item),
                }}
              >
                {index !== 0 && <Divider type="vertical" />}
                {item.handleName}
              </Link>
            ) : (
              <a key={index} style={item.style} onClick={item.disabled ? disabledFun : item.handleAction}>
                {index !== 0 && <Divider type="vertical" />}
                {item.handleName}
              </a>
            );
          }
        })}
      </div>
    </ListButtonDom>
  );
};

export default ListButtons;
