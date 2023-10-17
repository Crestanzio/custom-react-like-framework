const sasspkg = require("sass");
const path = require("path");

const sass = () => ({
  name: "sass",
  setup(build) {
    build.onResolve({ filter: /\.scss$/ }, (args) => ({
      path: path.resolve(args.resolveDir, args.path),
      namespace: "sass",
    }));
    build.onLoad({ filter: /.*/, namespace: "sass" }, async (args) => {
      // renderSync is significantly faster than render
      let compiled = sasspkg.compile({ file: args.path });
      return {
        contents: compiled.css.toString(),
        loader: "css",
      };
    });
  },
});

module.exports = sass;
