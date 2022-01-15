const env = require('../parseEnv');

let apiRootPath = env._SETTING_API_BASE_PATH.replace(/"/g, '') || '';
const proxySetting = {
  // 代理用户usercenter
  [`/${apiRootPath}/user`]: {
    target: env._SETTING_SERVER_PROXY_UC.replace(/"/g, ''),
    changeOrigin: true,
    pathRewrite: {
      [`^/${apiRootPath}/user/`]: '/',
    },
  },
};

module.exports = {
  proxySetting,
};
