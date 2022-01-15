import { atom } from 'recoil';

export type UserInfo = {
  userId: string;
  userName: string;
  age: number;
};

//获取登陆用户信息
export const userState = atom({
  key: 'userState',
  default: null,
});
