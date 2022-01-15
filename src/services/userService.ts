import request from '@/utils/request';
import { ServicePath } from '@/utils/constants';

export type searchType = {
  search?: string | undefined;
  status?: string | undefined;
  offset?: number;
  limit?: number;
};

const getUserList = (params: searchType) =>
  request({
    url: '/users',
    basePath: ServicePath.BASE_DATA,
    method: 'get',
    params,
  });
export { getUserList };
