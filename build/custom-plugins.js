//自定义插件地方
const compilerHooks = [
  {
    apply: (compiler) => {
      compiler.hooks.invalid.tap('invalid', function () {
        console.log('小李编译中...');
      });
    },
  },
];
module.exports = { compilerHooks };
