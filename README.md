#### 环境变量配置
|  环境  | 分支  | 标识  | 打包命令  |
| ------------ | ------------ | ------------ | ------------ |
| 开发  | development  | development  |  npm run serve  |
| 测试  | development-fix  | development-fix  |  npm run build-dev-fix  |
| 预发布  | release  |  release |  npm run build-release  |
| 生产  | production  | production  |  npm run build  |


#### 核心功能

##### 基于Axios的接口请求工具
##### layout的后管平台布局（参考：vue-admin-beautiful）
##### 数据采集和数据上报的全量数据埋点
##### tabs多标签
##### 基于localStroage和Cookie的工具类封装
##### lodash语法的应用


#### 基于vue-cli4的打包优化，具体详见vue.config.js

#### 关于全局注册，自动化

  ### 利用require.context提供的能力做自动化封装

#### 全局指令(有些指令可以加参数和值，具体参考src/directive/xx.ts对应文件)

  ### v-clone 复制文本指令
  ### v-drag 拖动元素指令，可扩展和优化
  ### v-ellipsis 一行省略号
  ### v-expandArea 扩大点击区域
  ### v-format 数字保留几位以及三位加,隔开


------------
