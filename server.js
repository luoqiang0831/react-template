// const webpackHotMiddleware = require("webpack-hot-middleware"); // HMR热更新中间件
const Webpack = require("webpack");
const kill = require("kill-port");
const WebpackDevServer = require("webpack-dev-server");

// webpack开发 配置文件
const webpackConfig = require("./config/webpack.dev.config");
// 自定义日志输出
// const logger = require("./logger");
// 服务配置
const appConfig = {
  port: 8080, //端口号,
  // host: "localhost", //主机号
};

const { port, host } = appConfig; // 监听的端口号
//编译器
const compiler = Webpack(webpackConfig);
//  devServer 参数
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
  // open: true, // 自动打开浏览器
  // compress: true, // gzip 压缩
  // stats: "minimal",
});
// 清除端口
kill(appConfig.port, "tcp")
  .then(() => {
    const server = new WebpackDevServer(devServerOptions, compiler);
    // app.use(webpackHotMiddleware(compiler)); // 挂载HMR热更新中间件
    // app.use(
    //   require("webpack-hot-middleware")(compiler, {
    //     log: false,
    //     path: "/__what",
    //     heartbeat: 2000,
    //   })
    // );

    server.listen(port, host, async (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("本地服务启动地址: http://localhost:%s", appConfig.port);
    });
  })
  .catch(console.log);
