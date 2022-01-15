const { assetsPath, resolve } = require('./../utils');
const { threadLoader, cacheLoader } = require('./loaders');

function getUrlloader(assetsPrefix) {
  return {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath(`${assetsPrefix}/[name].[contenthash:7].[ext]`),
    },
  };
}

module.exports = [
  {
    test: /\.(png|jpe?g|svg|gif|webp)$/,
    // 相当于 url-loader 的自动根据文件大小的配置能力
    type: 'asset',
    generator: {
      filename: 'assets/images/[name].[contenthash:8][ext]',
    },
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024, // 8kb
      },
    },
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [getUrlloader('fonts')],
  },
  {
    test: /\.svg$/,
    use: [cacheLoader, threadLoader(), '@svgr/webpack'],
    include: [resolve('src')],
  },
];
