const fs = require("fs/promises");
const path = require("path");
const zlib = require("zlib");
const { promisify } = require("util");
const compressGz = promisify(zlib.gzip);

const write = async (path, contents) => {
  await fs.writeFile(path, contents);
  return { path, contents };
};
const writeGz = async (filename, contents) => await write(`${filename}`, await compressGz(contents, { level: 9 }));

const gzip = () => ({
  name: "gzip",
  setup: (build) => {
    build.onEnd(async (result) => {
      const outputFiles = await Promise.all(
        result.outputFiles.map(async ({ path: filename, contents }) => {
          await fs.mkdir(path.dirname(filename), { recursive: true });
          return Promise.all([writeGz(filename, contents)]);
        })
      );
      return {outputFiles: outputFiles};
    });
  },
});

module.exports = gzip.default = gzip;
