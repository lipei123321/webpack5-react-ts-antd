const { resolve } = require('./../utils');
const env = require('../parseEnv');
const cacheLoader = {
  loader: 'cache-loader',
  options: {
    // 提供一个存放缓存项的缓存目录
    cacheDirectory: resolve('.cache-loader'),
  },
};

// node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。 当使用 thread-loader 时，需要设置 workerParallelJobs:
const threadLoader = (workerParallelJobs) => {
  const options = { workerParallelJobs };
  if (env.NODE_ENV === 'dev') {
    Object.assign(options, { poolTimeout: Infinity });
  }
  return { loader: 'thread-loader', options };
};

module.exports = {
  cacheLoader,
  threadLoader,
};
