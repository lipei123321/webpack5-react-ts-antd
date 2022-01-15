import { UserListPage, UserListPage2 } from '@/modules';
const routes = [
  {
    path: '/son-app/fed',
    component: UserListPage,
    exact: true,
  },
  {
    path: '/son-app/ai',
    component: UserListPage2,
    exact: true,
  },
];
export default routes;
