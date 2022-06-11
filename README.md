## 介绍

本项目主要为新开项目，能快速生产而创建的一套模板。
技术栈
- React
- Zustand
- React Route 6
- Antd Mobile
- umi-request

## 注意事项

本项目使用的状态管理工具为(zustand) 可以参考(https://github.com/pmndrs/zustand) zustand 相比 redux 和 umi 用起来会有惊喜。

项目中使用的请求方式用 use-request 建议大家采用。jsx 全局拦截方法在<code>utils/request.ts</code>中

路由也手动封装了下 初始化的全局信息也是在里面做的处理在<code>routers/index.ts</code>

## 构建 Start

```
yarn install		# 安装依赖模块
yarn husky		# 安装husky
yarn start		# 运行开发环境: http://localhost:8888
yarn build		# 正式打包，用于生产环境

yarn prettier		# 自动格式化src、mock目录下的所有.js/.css/.scss/.less文件
```

## 目录结构 Structure

```
.
react-luo-master
├─ config                           # webpack 配置
├─ mock                             # 本地数据mock
├─ public                           # 静态资源
├─ src
│  ├─ assets                        # 静态资源
│  ├─ component                     # 公共基础组件
│  ├─ customComp                    # 公共业务组件
│  ├─ skeleton                      # 骨架屏
│  ├─ pages                         # 业务页面
│  │  ├─ home                       # 具体页面（小写开头）
│  │  │  ├─ index.js
│  │  │  └─ index.less
│  ├─ routers                       # 全局路由
│  ├─ store                         # 全局model数据
│  ├─ styles                        # 全局样式
│  ├─ utils                         #
│  │  ├─ rem.tsx                    # 百分比样式计算
│  │  ├─ server.tsx                 # server
│  │  └─ tools.tsx                  # 工具函数
├─ commitlint.config.js             # git 提交规范
├─ package.json
├─ postcss.config.js                # 样式配置
├─ server.js
├─ tsconfig.json
└─ 依赖清单.md
```

## 请求封装

### 参考[useRequest](https://hooks.umijs.org/zh-CN/hooks/async#%E6%89%A9%E5%B1%95%E7%94%A8%E6%B3%95)

### 样式隔离

采用了 postcss 进行处理 其中需要注意然后 less 文件名中如包含 module 关键字则会进行样式隔离 加入 hash 和文件名

## 代码命名规范

体检 - medical
...
## 页面枚举

```js
首页: "INDEX";
选择方案: "SELECT_PLAN";
套餐详情: "PACKAGE_DETAIL";
```

## Git 提交规范

### 主要 type

```js
feat: 增加新功能
fix: 修复 bug
```

### 特殊 type

```js
docs: 只改动了文档相关的内容
style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
build: 构造工具的或者外部依赖的改动，例如 webpack，npm
refactor: 代码重构时使用
revert: 执行 git revert 打印的 message
deploy: 发布
```

```js
test: 添加测试或者修改现有测试
perf: 提高性能的改动
ci: 与 CI（持续集成服务）有关的改动
chore: 不修改 src 或者 test 的其余修改，例如构建过程或辅助工具的变动
```

### 上线操作

| 环境  |     分支     |
| :---: | :----------: |
| test  | common-test  |
| stage | common-stage |
|  prd  |   relsase    |

release 发布成功后 合并 master
