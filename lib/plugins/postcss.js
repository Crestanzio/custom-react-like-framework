const fs = require("fs");
const path = require("path");
const postcsspkg = require("postcss");
const plugins = require("../../postcss.config").plugins;

const postcss = (filter = /.(scss?|css)$/) => ({
  name: "postcss",
  setup(build) {
    build.onResolve({ filter }, async (args) => ({
      path: path.resolve(args.resolveDir, args.path),
      namespace: "postcss",
    }));
    build.onLoad({ filter }, async (args) => {
      let css = await fs.promises.readFile(args.path, "utf8");

      let result = await postcsspkg(plugins).process(css, {
        from: args.path,
      });

      return { contents: result.css, loader: "css" };
    });
  },
});

module.exports = postcss;