/** 这是用于生产环境的webpack配置文件 **/

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 将CSS提取出来，而不是和js混在一起,修改css的引入以文件的形式,用之前style标签注入,用之后以link标签引入样式
const { generateScopedName } = require("./rename");
const threadLoader = require("thread-loader"); // 多进程打包，HappyPack也是，但是已经不维护了，正常loader结尾的表示转译，因为webpack只识别js和json格式的文件，需要识别其它的都需要其他工具转译
/**
 * 基础路径
 * 比如我上传到自己的服务器填写的是："/work/pwa/"，最终访问为"https://isluo.com/work/pwa/"
 * 根据你自己的需求填写
 * "/" 就是根路径，假如最终项目上线的地址为：https://isluo.com/， 那就不用改
 * **/
const lessRegex = /\.less$/; // 新增
const lessModuleRegex = /\.module\.less$/; // 新增
const isEnvProduction =
  process.env.NODE_BUILD === "prd" || process.env.NODE_BUILD === "analyz";

const jsWorkerPool = {
  poolTimeout: 2000,
};

const cssWorkerPool = {
  workerParallelJobs: 2,
  poolTimeout: 2000,
};

// 如果在本地才开启
if (process.env.NODE_BUILD === "local") {
  threadLoader.warmup(jsWorkerPool, ["babel-loader"]); // 预热一般放在其它loader模块前，把后面指定的模块载入node.js模块的缓存中
  threadLoader.warmup(cssWorkerPool, [
    "css-loader",
    "less-loader",
    "postcss-loader", // 浏览器属性兼容加上对应的前缀
  ]);
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              cacheDirectory: true, //开启babelh缓存，第二次构建时，会读取之前的缓存
            },
          },
        ],
      },
      {
        //图片解析
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset/resource", // 发送一个单独的文件并导出URL，替代file-loader，可以打包资源类型：字体文件、图表文件、图片文件
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
      // webpack 4
      // {
      //   // 文件解析
      //   test: /\.(eot|woff|otf|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
      //   include: path.resolve(__dirname, "../src"),
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "assets/[name].[hash:4].[ext]",
      //       },
      //     },
      //   ],
      // },
      // {
      //   // 图片解析
      //   test: /\.(png|jpg|jpeg|gif)$/i,
      //   include: path.resolve(__dirname, "../src"),
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192,
      //         name: "assets/[name].[hash:4].[ext]",
      //       },
      //     },
      //   ],
      // },
      {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: { javascriptEnabled: true },
            },
          },
        ],
      },
      {
        test: lessModuleRegex, // 如果是 xxx.less 文件，而不是 xxx.module.less 文件，就不开启 css module，仅正常引入该 less 文件
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              modules: {
                getLocalIdent: (context, localIdentName, localName) => {
                  return generateScopedName("[local]__[hash:base64:4]")(
                    localName,
                    context.resourcePath
                  );
                },
                // localIdentName: "[local]__[hash:base64:4]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      // {
      //   test: lessModuleRegex, // 如果是 xxx.module.less 文件，就开启 css module
      //   // getStyleLoaders 是 create-react-app 在 webpack 中定义的一个方法
      //   // 其目的是为了让所有 css 相关的 loader 最终都能被 css-loader 接管处理
      //   // 其提供了两个参数：
      //   // 1. options：定义 css-loader 的配置项
      //   // 2. pre：在 css-loader 之前进行的 loader
      //   use: getStyleLoaders(
      //     {
      //       importLoaders: 3,
      //       // sourceMap: isEnvProduction && shouldUseSourceMap,
      //       modules: {
      //         /**
      //         getCSSModuleLocalIdent 是 create-react-app 默认引入的一个方法，
      //         其作用是将处理后的 css module 重命名为规范的格式，
      //         原有的明明格式与我们需要的格式不一样（我们需要的格式为 [local]-[hash:base64:5]）,
      //         因此需要注释掉该配置项，否则我们接下来的配置不会生效
      //         **/
      //         // getLocalIdent: getCSSModuleLocalIdent,

      //         // localIdentName 规范了 css module 中 class 的命名格式，这里与我们 babel 中的配置要一致
      //         localIdentName: "[local]-[hash:base64:5]",
      //       },
      //     },
      //     "less-loader"
      //   ),
      // },
      {
        test: /\.css$/,
        use: [
          isEnvProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      // {
      //   // wasm文件解析
      //   test: /\.wasm$/,
      //   include: path.resolve(__dirname, "src"),
      //   type: "webassembly/experimental",
      // },
      // {
      //   // xml文件解析
      //   test: /\.xml$/,
      //   include: path.resolve(__dirname, "src"),
      //   use: ["xml-loader"],
      // },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".less", ".css", ".wasm"], // 引入模块不带扩展名，后缀名自动补全高频文件后缀名放前面
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
};
