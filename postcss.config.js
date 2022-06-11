/** postcss-loader 解析器所需的配置文件 **/
// module.exports = {
//   plugins: [
//     require("autoprefixer"),
//     require("postcss-pxtorem")({
//       rootValue: 100,
//       propWhiteList: [],
//     }),
//   ],
// };
module.exports = {
  plugins: {
    autoprefixer: {},
    // "postcss-modules": {
    //   generateScopedName: "[name]",
    //   hashPrefix: "prefix",
    // },
    // "react-css-modules": {
    //   filetypes: {
    //     ".less": {
    //       syntax: "postcss-less",
    //     },
    //   },
    // },
    "postcss-pxtorem": {
      rootValue: 75, // html节点设的font-size大小，由于chrome最小12px，所以基值要设置大写
      unitPrecision: 5, // 转rem精确到小数点多少位
      propList: ["*"],
      // propList: [
      //   "font",
      //   "font-size",
      //   "line-height",
      //   "letter-spacing",
      //   "margin-top",
      // ], // 指定转换成rem的属性，支持 * ！
      selectorBlackList: [], // str或reg ，指定不转换的选择器，str时包含字段即匹配
      replace: true,
      mediaQuery: false, // 媒体查询内的px是否转换minPixelValue:0// 小于指定数值的px不转换
    },
  },
};
