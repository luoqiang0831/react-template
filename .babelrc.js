const { generateScopedName } = require("./config/rename")

module.exports = function (api) {
  //{ chrome: "58", ie: "11" },
  api.cache.using(() => process.env.NODE_ENV)

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          corejs: 3,
          // caller.target 等于 webpack 配置的 target 选项
          targets: api.caller((caller) => caller && caller.target === "node") ? { node: "current" } : { chrome: "58" },
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-dynamic-import",
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      !api.env("production") && "react-refresh/babel",
      // "react-loadable/babel",
      [
        "import",
        {
          libraryName: "antd",
          style: true,
        },
      ],
      [
        "react-css-modules",
        {
          exclude: "node_modules",
          generateScopedName: generateScopedName("[local]__[hash:base64:4]"),
          autoResolveMultipleImports: true,
          webpackHotModuleReloading: true,
          filetypes: {
            ".less": {
              syntax: "postcss-less",
            },
          },
        },
      ],
    ],
  }
}
