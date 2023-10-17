// Lint the build files
const { ESLint } = require("eslint");

const eslint = ({ filter = /.(jsx?|js)$/, ...options } = {}) => ({
  name: "eslint",
  setup(build) {
    let eslint = new ESLint(options);
    let filesToLint = [];

    build.onLoad({ filter }, ({ path }) => {
      filesToLint.push(path);
    });

    build.onEnd(async () => {
      let result = await eslint.lintFiles(filesToLint);
      options.fix ? ESLint.outputFixes(result) : null;

      let formatter = await eslint.loadFormatter("stylish");
      let output = formatter.format(result);
      output.length > 0 ? console.log(output) : null;
    });
  },
});

module.exports = eslint;
