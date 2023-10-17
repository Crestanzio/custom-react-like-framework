const sass = require("../plugins/sass");
const eslint = require("../plugins/eslint");
const gzip = require("../plugins/gzip");
const postcss = require("../plugins/postcss");

require("esbuild").build({
  logLevel: "info",
  entryPoints: [`src/index.js`],
  outdir: "build",
  outbase: "src",
  bundle: true,
  sourcemap: true,
  splitting: true,
  format: "esm",
  loader: { ".js": "jsx" },
  jsxFactory: "faster.createElement",
  target: 'esnext',
  plugins: [eslint(), postcss()],
});
