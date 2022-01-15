import { selector } from 'recoil';
import { userState } from '@/store/atoms/userAtom';
/**
 * 获取登陆后用户信息
 */
export const userInfoQuery = selector({
  key: 'getUserInfo',
  get: ({ get }) => {
    return get(userState);
  },
});
