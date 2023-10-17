const config = {
  plugins: [
    require("postcss-mixins"),
    require("postcss-preset-env")({
      stage: 1,
      features: {
        "nesting-rules": true,
      },
    }),
  ],
};

module.exports = config;