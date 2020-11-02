const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const DIST_DIR = path.resolve(__dirname, "./dist");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: DIST_DIR,
    filename: "[name].[contenthash].bundle.js",
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Shynn React Webpack",
      template: path.resolve(__dirname, "./public/index.html"),
      favicon: path.resolve(__dirname, "./public/favicon.ico"),
      filename: "index.html",
      minify: {
        removeComments: true,
      },
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      layouts: path.resolve(__dirname, "src/layouts"),
      redux: path.resolve(__dirname, "src/redux"),
      context: path.resolve(__dirname, "src/context"),
      hooks: path.resolve(__dirname, "src/hooks"),
    },
  },
};
