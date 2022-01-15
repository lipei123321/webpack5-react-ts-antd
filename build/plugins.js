const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
//const WorkboxPlugin = require('workbox-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { compilerHooks } = require('./custom-plugins');
//const constants = require('./constants');
const config = require('./config');
const { resolve, assetsPath } = require('./utils');
//const env = require('./env.json');
// 加载.env.* 环境变量
const env = require('./parseEnv');

const basePlugins = [
  new MomentLocalesPlugin({
    localesToKeep: ['es-us', 'zh-cn'],
  }),
  new webpack.DefinePlugin({ 'process.env': env }),
  new TypedCssModulesPlugin({
    globPattern: 'src/!(styles)/**/*.scss',
  }),
  new ForkTsCheckerWebpackPlugin({
    typescript: { configFile: resolve('tsconfig.json') },
    eslint: { enabled: true, files: resolve('src/**/*.{ts,tsx}') },
  }),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'public/index.html',
    inject: true,
  }),
  new CaseSensitivePathsPlugin(),
  ...compilerHooks,
];

const prodPlugins = [
  new HtmlWebpackPlugin({
    filename: config.index,
    template: 'public/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: assetsPath('css/[name].[contenthash].css'),
    chunkFilename: assetsPath('css/[name].[id].[contenthash].css'),
    ignoreOrder: true,
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: 'public',
        filter: (resourcePath) => {
          if (resourcePath.includes('index.html')) {
            return false;
          }
          return true;
        },
        to: '',
      },
    ],
  }),
  // new WorkboxPlugin.GenerateSW({
  //   cacheId: 'ts-react-webpack',
  //   clientsClaim: true,
  //   skipWaiting: true,
  //   offlineGoogleAnalytics: false,
  //   inlineWorkboxRun·time: true,
  //   // precache ignore
  //   exclude: [/index\.html$/, /\.map$/],
  //   // dynamic update
  //   runtimeCaching: [
  //     {
  //       urlPattern: /this\\.is\\.a\\.regex/,
  //       handler: 'NetworkFirst',
  //     },
  //     {
  //       urlPattern: /this\\.is\\.a\\.regex/,
  //       handler: 'StaleWhileRevalidate',
  //     },
  //   ],
  // }),
];

if (config.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  prodPlugins.push(new BundleAnalyzerPlugin());
}

module.exports = basePlugins.concat(env.NODE_ENV === 'development' ? devPlugins : prodPlugins);
