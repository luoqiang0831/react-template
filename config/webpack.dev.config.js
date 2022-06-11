/** 这是用于开发环境的webpack配置文件 **/

const path = require("path"); // 获取绝对路径用
const webpack = require("webpack"); // webpack核心
const BaseConfig = require("./webpack.base.config"); // 公共配置
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 动态生成html插件 把js或者css文件等自动引入HTML中
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin"); // 用于直接复制public中的文件到打包的最终文件夹中
// const HappyPack = require("happypack"); // 多线程编译
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin"); // 加速TypeScript类型检查
//引入postcss-pxtorem
const pxtorem = require("postcss-pxtorem");
const PUBLIC_PATH = "/"; // 基础路径
const { merge } = require("webpack-merge");
const Mock = require("../mock/mock-data");

module.exports = merge(BaseConfig, {
  mode: "development",
  stats: "errors-only",
  entry: [
    "/src/index.tsx", // 项目入口
  ],
  output: {
    path: path.resolve(__dirname), // 将打包好的文件放在此路径下，dev模式中，只会在内存中存在，不会真正的打包到此路径
    publicPath: PUBLIC_PATH, // 文件解析路径，index.html中引用的路径会被设置为相对于此路径
    filename: "bundle-[contenthash].js", // 编译后的文件名字
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      // // 定位端口代理
      // "/gw/app/position/": {
      //   secure: false,
      //   changeOrigin: true,
      //   target: "https://m-test05.dongfangfuli.com/",
      //   // pathRewrite: { "^/gw/app/position": "/gw/app/position" },
      // },
      // 端口代理
      // "/gw/app/plan/package/": {
      //   secure: false,
      //   changeOrigin: true,
      //   target: "https://corp.m.test05.dongfangfuli.com/",
      //   // target: "https://corp.m.test05.dongfangfuli.com/",
      //   // pathRewrite: { "^/gw/app/": "" },
      // },
      "/mallapi/": {
        secure: false,
        changeOrigin: true,
        target: "https://corp.m.test05.dongfangfuli.com/",
        // pathRewrite: { "^/gw/app/": "" },
      },
      "/gw/app/": {
        secure: false,
        changeOrigin: true,
        target: "https://corp.m.test05.dongfangfuli.com/",
      },
    },
    // contentBase: path.resolve(__dirname),
    hot: true,
    // https://github.com/pmmmwh/react-refresh-webpack-plugin react 18 热更新重载问题 未发布正式版所以没改
    onBeforeSetupMiddleware(devServer) {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }
      Mock(devServer.app);
    },
  },
  // deployUrl: "127.0.0.0:8080", // 本地代码推推送到指定服务器
  devtool: "eval-source-map", // 报错的时候在控制台输出哪一行报错，这个模式重构比source-map快，而且包含dataUrl文件
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  // target: "web",
  cache: {
    // 持久化缓存生成的 webpack 模块和 chunk，来改善构建速度
    // 将缓存类型设置为文件系统
    type: "filesystem",
    buildDependencies: {
      /* 将你的 config 添加为 buildDependency，
           以便在改变 config 时获得缓存无效*/
      config: [__filename],
      /* 如果有其他的东西被构建依赖，
           你可以在这里添加它们*/
      /* 注意，webpack.config，
           加载器和所有从你的配置中引用的模块都会被自动添加*/
    },
    // 指定缓存的版本
    version: "1.0",
  },
  // externals: {
  //   react: "window.React",
  //   "react-dom": "window.ReactDOM",
  // },
  plugins: [
    // new webpackbar(),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    // new AntdDayjsWebpackPlugin(), // dayjs 替代 momentjs
    new webpack.DefinePlugin({
      "process.env": {
        BUILD: JSON.stringify(`${process.env.NODE_ENV}`),
      },
    }),
    // new HappyPack({
    //   use: ["babel-loader", "css-loader", "postcss-loader"],
    // }),
    // new HappyPack({
    //   id: "ts",
    //   threads: 2,
    //   use: [
    //     {
    //       path: "ts-loader",
    //       query: {
    //         happyPackMode: true,
    //         configFile: path.resolve(__dirname, "../tsconfig.json"),
    //       },
    //     },
    //   ],
    // }),
    // // typescript 添加类型检查
    new ForkTsCheckerWebpackPlugin({
      // async: false,
      typescript: {
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      },
    }),

    new HtmlWebpackPlugin({
      // 根据模板插入css/js等生成最终HTML
      filename: "index.html", //生成的html存放路径，相对于 output.path
      // favicon: "./public/favicon.png", // 自动把根目录下的favicon.ico图片加入html
      template: "./public/index.html", //html模板路径
      inject: true, // 是否将js放在body的末尾
      // 后续可改成东福的cdn 目前用的是支付宝的
      // scripts: `
      //   <script src="https://gw.alipayobjects.com/os/lib/react/17.0.2/umd/react.development.js"></script>
      //   <script src="https://gw.alipayobjects.com/os/lib/react-dom/17.0.2/umd/react-dom.development.js"></script>
      //  `,
    }),

    // 拷贝public中的文件到最终打包文件夹里
    new CopyPlugin({
      patterns: [
        {
          from: "./public/**/*",
          to: "./",
          globOptions: {
            ignore: ["**/favicon.png", "**/index.html"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
});
