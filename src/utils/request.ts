import axios from 'axios';
import { get } from 'lodash-es';
import { notification, Modal } from 'antd';
import NProgress from 'nprogress';
import { getToken, removeToken } from './auth';
import 'nprogress/nprogress.css';
import BASE_CONSTS, { ServicePath } from './constants';

const getApiUrl = (BASE_PATH: string) =>
  `${BASE_CONSTS._SETTING_WEB_SERVICE_URL}/${BASE_CONSTS._SETTING_API_BASE_PATH}/${BASE_PATH}`;

NProgress.configure({
  showSpinner: true,
  easing: 'ease',
  speed: 500,
});

// 创建axios实例
const service = axios.create({
  timeout: 150000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
});
const handleError = (error: any) => {
  NProgress.done();
  const { statusText, status } = error.response || {};
  let errInfo = get(error.response || {}, ['data', 'message']) || error.message || '请求服务出错';
  const errCode = get(error.response || {}, ['data', 'code']) || error.code || -1;
  // 请求资源不存在
  if (status === 404) errInfo = `请求的资源[${get(error.response, ['config', 'url'])}]不存在！`;
  // 请求超时打断
  if (errCode === 'ECONNABORTED') {
    errInfo = '服务连接失败或请求超时！';
  }
  /* eslint-disable */
  if (status === 401) {
    handleLoginTimeout('授权失败');
  } else if (errCode === '4035' || errCode === '4018') {
    handleLoginTimeout('登录超时');
  } else {
    notification.error({
      key: 'SYSTEM_ERROR',
      message: '系统错误',
      description: errInfo,
    });
  }
  return Promise.reject({
    success: false,
    code: errCode,
    message: errInfo || statusText,
    error: errInfo || statusText,
    data: get(error.response, 'data.data', {}),
  });
};
// request拦截器
service.interceptors.request.use(
  (config: any) => {
    const basePath = config.basePath || ServicePath.BASE_DATA;
    config.baseURL = getApiUrl(basePath);
    const mockFlg = process.env._SETTING_ENABLE_MOCK_API + '';
    if (mockFlg === 'true') {
      config.baseURL = '/';
    }
    const token = getToken();
    if (token) {
      config.headers.Authorization = token; // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error: any) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  (response: any) => {
    NProgress.done();
    // code为非0000是抛错
    const res = response.data;
    if (response.status !== 200 && res.Status !== 'Ok') {
      notification.error({
        key: 'SYSTEM_ERROR',
        message: '系统错误',
        description: res.message,
      });

      // 401:未登录;
      if (res.code === 401) {
        handleLoginTimeout();
      }
      return Promise.reject('error');
    }
    const { pagination } = res;
    return {
      ...res,
      pagination: pagination
        ? {
            current: pagination.offset,
            pageSize: pagination.limit,
            total: pagination.total,
          }
        : undefined,
    };
  },
  (error: any) => handleError(error)
);

/**
 * 处理登录超时/授权失败
 */
const handleLoginTimeout = (errorMsg = '登录超时') => {
  let secondsToGo = 5;
  removeToken();
  const modal = Modal.warn({
    title: errorMsg,
    content: `系统${errorMsg},${secondsToGo} 秒后自动跳转至登录页面！`,
    okText: '立即跳转至登录页面',
    onOk: () => {
      clearInterval(timer);
      modal.destroy();
      window.location.reload();
    },
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    if (modal.update) {
      modal.update({
        content: `${errorMsg},${secondsToGo} 秒后自动跳转至登录页面！`,
      });
    }
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
    window.location.reload();
  }, secondsToGo * 1000);
  return modal;
};

export default service;
