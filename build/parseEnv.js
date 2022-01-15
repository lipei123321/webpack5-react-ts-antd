const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv'); // 解析.env.*文件为键值对，并写入环境变量。
const variableExpansion = require('dotenv-expand'); // 拿到dotenv解析的参数，扩展计算机上已经存在的环境变量（存在就赋值）。

const resolve = (dir) => path.join(__dirname, dir);
const prefixRE = /^_SETTING_/;

/*
这里加载的是development 模式文件，需要其他的可以根据启动参数来动态修改，或者NODE_ENV来修改

ag：根据NODE_ENV来修改
const env = variableExpansion(
  dotenv.parse(fs.readFileSync(resolve(`./.env.${process.env.NODE_ENV}`)))
)
*/
const env = variableExpansion(dotenv.parse(fs.readFileSync(resolve(`../.env.${process.env.NODE_ENV}`))));
Object.keys(env).forEach((key) => {
  if (prefixRE.test(key) || key === 'NODE_ENV') {
    env[key] = JSON.stringify(env[key]); // JSON.stringify 的目的是为了给webpack.DefinePlugin 的值是 '"development"'，DefinePlugin插件配置要求
  } else {
    Reflect.deleteProperty(env, key);
  }
});

module.exports = env;
