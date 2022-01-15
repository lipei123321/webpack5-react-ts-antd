##项目简介
  技术栈介绍：react+ts+mobx+webpack+antd 
  项目中包含各种辅助功能：包含eslint、prettier验证规则，stylelint配置，git提交规则，自定义颜色主题功能等。
##运行项目
> 下载项目依赖
```bash
yarn install
```  
> 启动项目
```bash
yarn start
``` 
> 打包项目
```bash
yarn build
``` 

##项目配置文件描述
.eslintrc.js 配置eslint验证规则。

.gitignore git文件管理，主要说明哪些文件不需要添加到版本管理中（提交到git上面去）。

.lintstagedrc  lint-staged代码过滤。 含义：在代码提交之前，进行代码规则检查能够确保进入git库的代码都是符合代码规则的。但是整个项目上运行lint速度会很慢，lint-staged能够让lint只检测暂存区的文件，所以速度很快。如果不配置请去掉package.json的配置。

.npmrc 配置npm或yarn下载依赖的源。

.prettierignore 哪些文件不需要Prettier插件的格式化就配置在这里，文件级别的忽略。

.stylelintignore styleLint检查工具忽略文件匹配规则

.stylelintrc.js  stylelint该检查配置

commitlint.config.js 配置公司git提交的规则

postcss.config.js postcss就是一个使用JavaScript插件来转换CSS的工具

theme.js 可以用于antd自定义主题开发配置

tsconfig.json ts ts编译配置信息

##webpack 配置详细描述 webpack的配置在build文件下面包含：
config.js webpack基础配置

constants.js 变量配置

custom-plugins.js 自定义插件配置 扩展apply

rules文件夹：
  定义规则文件夹包含（图片文件、js规则、样式规则） 
  
  loaders.js 上面所有loader前面添加cache-loader，前提供一个缓存目录加速启动。
typings 第三方类型声明ts文件
