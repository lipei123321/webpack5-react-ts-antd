import request from '@/utils/request';
import { ServicePath } from '@/utils/constants';

export type loginType = {
  userId: string;
  password?: string;
};

const login = async (data: loginType) => {
  const response = await request({
    url: '/oauth/login',
    basePath: ServicePath.BASE_DATA,
    method: 'post',
    data,
  });
  return response;
};

const logout = async (data: loginType) => {
  const response = await request({
    url: '/oauth/logout',
    basePath: ServicePath.BASE_DATA,
    method: 'post',
    data,
  });
  return response;
};
export { login, logout };
