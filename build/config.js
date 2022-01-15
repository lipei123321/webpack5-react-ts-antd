const path = require('path');

module.exports = {
  devPort: 9090,
  index: path.resolve(__dirname, './../dist/index.html'),
  assetsRoot: path.resolve(__dirname, './../dist'),
  assetsSubDirectory: 'static',
  // 用于监控的生产源
  sourceMap: 'source-map',
};
