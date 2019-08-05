// const TerserPlugin = require("terser-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const paths = require("./paths");

module.exports = {
  mode: "none", // "production" | "development" | "none"
  entry: {
    main: paths.appIndexJs
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          // isEnvProduction && MiniCssExtractPlugin.loader,

          "css-loader"
        ],
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true // 防止被错误的tree shaking
      }
    ],
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader")
      }
    ]
  }

  //   plugins: [
  //     new CompressionPlugin({
  //       // gzip 压缩
  //       algorithm: "gzip",
  //       compressionOptions: { level: 9 },
  //       test: new RegExp(
  //         "\\.(js|css)$" // 压缩 js 与 css
  //       )
  //     })
  //   ]
};
