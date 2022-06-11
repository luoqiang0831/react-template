const { interpolateName } = require("loader-utils");
const path = require("path");
const reg = "[local]__[hash:base64:4]";

// 解决postcss babel-plugin-react-css-modules 生成hash 和css-loader 不匹配问题
function generateScopedName(pattern) {
  const context = process.cwd();
  return function generate(localName, filepath) {
    const name = pattern.replace(/\[local\]/gi, localName);
    const loaderContext = {
      resourcePath: filepath,
    };

    const loaderOptions = {
      content: `${path
        .relative(context, filepath)
        .replace(/\\/g, "/")}\u0000${localName}`,
      context,
    };

    const genericName = interpolateName(loaderContext, name, loaderOptions);
    const file_hash = genericName
      .replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-")
      .replace(/^((-?[0-9])|--)/, "_$1");
    return file_hash;
  };
}

module.exports = {
  generateScopedName,
};
