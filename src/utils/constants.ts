import appConfig from './app-config';
import { get, isPlainObject, isNil, startsWith } from 'lodash-es';

const { _FED_ENVS } = window;
const BASE_CONSTS = initAppConfig();
export default BASE_CONSTS;

/**
 * 初始化应用配置
 * 配置优先级顺序: mlp_env.js -> node 环境变量 -> app-config.js
 */
function initAppConfig() {
  const _conf = initConfig(appConfig);
  return _conf;
}
function initConfig(config: any) {
  // eslint-disable-next-line array-callback-return
  Object.keys(config).map((key) => {
    if (isPlainObject(get(config, key))) {
      initConfig(get(config, key));
    }
    const envSetting = get(_FED_ENVS, key);
    if (!isNil(envSetting)) {
      config[key] = envSetting;
    } else {
      const nodeEnvSetting = get(process.env, key);
      if (!isNil(nodeEnvSetting)) {
        config[key] = nodeEnvSetting;
      }
    }
  });
  return config;
}

// 后台图片使用方法（通过http请求获取的图片）
export const wrapServiceUrl = (srvName: string, url: string) => {
  if (startsWith(url, '/')) {
    url = url.slice(1);
  }
  return `${BASE_CONSTS._SETTING_WEB_SERVICE_URL}/${BASE_CONSTS._SETTING_API_BASE_PATH}${srvName}/${url}`;
};

export const ServicePath = {
  BASE_DATA: 'base',
};
