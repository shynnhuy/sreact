const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const DIST_DIR = path.resolve(__dirname, "./dist");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    historyApiFallback: true,
    contentBase: DIST_DIR,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
