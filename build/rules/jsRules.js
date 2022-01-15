const { resolve } = require('./../utils');
const { cacheLoader, threadLoader } = require('./loaders');

module.exports = [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    include: [resolve('src')],
    exclude: /node_modules/,
    use: [
      cacheLoader,
      threadLoader(),
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
];
