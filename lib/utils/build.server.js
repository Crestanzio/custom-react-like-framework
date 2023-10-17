const path = require('path');
const server = path.resolve("./public");
const eslint = require('../plugins/eslint');
const gzip = require('../plugins/gzip');
const postcss = require("../plugins/postcss");
const http = require("http")
// const hotreload = require('../plugins/hotreload');

require("esbuild").serve({
  servedir: server,
  host: "localhost",
  port: 3000,
}, {
  entryPoints: ["src/index.js"],
  outdir: server,
  bundle: true,
  loader: { ".js": "jsx", ".jpeg": "file" },
  jsxFactory: "faster.createElement",
  target: 'esnext',
  plugins: [postcss()],
}).then(console.log(`Server is running...`))