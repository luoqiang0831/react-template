const { generateScopedName } = require("./config/rename");

module.exports = {
  presets: [
    "@babel/preset-env",
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
};
