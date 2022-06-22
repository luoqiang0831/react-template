const path = require("path")

// https://jestjs.io/docs/code-transformation#transforming-images-to-their-path
module.exports = {
  process(sourceText, sourcePath, options) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    }
  },
}
