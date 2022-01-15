//根据Webpack中的tsconfig路径加载模块 插件
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const config = require('./config'); //基础信息配置
const constants = require('./constants'); //常量配置
const proxySetting = require('./proxy/proxy'); //常量配置
const styleRules = require('./rules/styleRules'); //样式规则配置
const jsRules = require('./rules/jsRules'); //js规则配置
const fileRules = require('./rules/fileRules'); //图片文件规则配置
const plugins = require('./plugins'); //插件配置
const { assetsPath, resolve } = require('./utils'); //工具类
const apiMocker = require('webpack-api-mocker');
const mocker = path.resolve(__dirname, '../mock/index.js');
const env = require('./parseEnv');
const conf = {
  mode: 'development', //模式通过选择 development, production 默认值为 production。
  entry: { app: ['./src/index.tsx'] }, //入口。webpack从哪里开始构建项目依赖
  optimization: {
    runtimeChunk: true,
    sideEffects: true, // 默认false，表示是否移除无副作用的模块
    //分开打js
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        react_vendor: {
          test: /[/\\]node_modules[/\\](react|react-dom|react-document-title|react-iframe)[/\\]/,
          name: 'react_vendor',
          chunks: 'all',
        },
        antv_vendor: {
          test: /[/\\]node_modules[/\\](@antv\/*)[/\\]/,
          name: 'antv_vendor',
          chunks: 'all',
        },
        antd_vendor: {
          test: /[/\\]node_modules[/\\](antd)[/\\]/,
          name: 'antd_vendor',
          chunks: 'all',
        },
        antd_icons_vendor: {
          test: /[/\\]node_modules[/\\](@ant-design\/*)[/\\]/,
          name: 'antd_icons_vendor',
          chunks: 'all',
        },
        util_vendor: {
          test: /[/\\]node_modules[/\\](immer|moment|lodash-es|axios|ahooks|marked)[/\\]/,
          name: 'util_vendor',
          chunks: 'all',
        },
        ui_vendor: {
          test: /[/\\]node_modules[/\\](classnames|styled-components)[/\\]/,
          name: 'ui_vendor',
          chunks: 'all',
        },
        json_edit_vendor: {
          test: /[/\\]node_modules[/\\](jsoneditor)[/\\]/,
          name: 'json_edit_vendor',
          chunks: 'all',
        },
        defaultVendors: {
          test: /[/\\]node_modules[/\\]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  output: {
    path: config.assetsRoot, //路径
    filename: env.NODE_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[contenthash].js'), //打包后的文件bundle名称
    chunkFilename: env.NODE_ENV === 'development' ? '[name].js' : assetsPath('js/[name].[id].[contenthash].js'), //chunk 文件指的就是要懒加载的代码。
    publicPath: '/', //公共路径
    pathinfo: false,
  },
  resolve: {
    //配置模块如何解析
    //按顺序解析这些后缀名文件
    extensions: constants.FILE_EXTENSIONS,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve('tsconfig.webpack.json'),
        extensions: constants.FILE_EXTENSIONS,
      }),
    ],
  },
  module: {
    //处理不同文件的规则
    rules: [...styleRules, ...jsRules, ...fileRules],
  },
  plugins, //插件配置引入
  stats: 'minimal',
  target: 'web',
  devtool: config.sourceMap, //生产sourcemap
};

if (process.env.NODE_ENV === 'development') {
  conf.devServer = {
    // 不显示模块信息
    stats: 'errors-warnings',
    //// 日志级别- 'info': 'silent' | 'trace' | 'debug' | 'info' | 'warn' | 'error'
    clientLogLevel: 'warn',
    //端口
    port: config.devPort,
    //热加载
    hot: true,
    inline: true, //缺少该配置，输入路由会404
    historyApiFallback: true, //缺少该配置，输入路由会404
    //为每个静态文件开启 gzip
    compress: true,
    disableHostCheck: true,
    progress: true,
    open: true, // 自动打开浏览器
    proxy: env._SETTING_ENABLE_PROXY_API.replace(/"/g, '') === 'true' ? proxySetting : {}, // 代理接口转发
    before(app) {
      if (env._SETTING_ENABLE_MOCK_API.replace(/"/g, '') === 'true')
        apiMocker(app, mocker, {
          changeHost: true,
        });
    },
  };
}

module.exports = conf;
