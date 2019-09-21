const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const paths = require("./paths");

module.exports = {
  mode: "none", // "production" | "development" | "none"
  entry: {
    main: paths.appIndexJs
  },
  output: {
    path: paths.appBuild,
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve("css-loader")]
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        // sideEffects: true // 防止被错误的tree shaking
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve("babel-loader")
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${paths.appSrc}/**/*`, { nodir: true })
    }),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        }
      )
    )
  ]
};
