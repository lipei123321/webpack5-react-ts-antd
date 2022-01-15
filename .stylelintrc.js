// @ts-nocheck
module.exports = {
  //rules优先级大于extends，建议采用extends方式统一管理
  extends: 'stylelint-config-standard', //官方推荐方式
  plugins: ['stylelint-order'], //用到的插件
  //它告诉stylelint该检查什么，该怎么报错。所有规则默认都是关闭的。
  rules: {
    'prettier/prettier': true,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local', 'export'] }],
    'property-no-unknown': [true, { ignoreProperties: ['composes', '/^var/'] }],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-alphabetical-order': true,
  },
};
