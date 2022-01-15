export interface IFMenuBase {
  path?: string;
  component?: any;
  exact?: boolean;
  id?: string;
  name?: string;
  icon?: string;
  query?: string;
  requireAuth?: string;
  addition?: { url: string; moduleType: string };
  route?: string;
  /** 是否登录校验，true不进行校验（访客） */
  login?: boolean;
}

export interface IFMenu extends IFMenuBase {
  children?: IFMenu[];
  parentMenus?: [];
}
