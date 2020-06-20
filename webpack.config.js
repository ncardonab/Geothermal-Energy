const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "js/app.bundle.js",
  },
  devServer: {
    port: 4000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, "docs"),
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|PNG|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      //   removeRedundantAttributes: true,
      //   removeScriptTypeAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   useShortDoctype: true,
      // },
    }),
    new MiniCssExtractPlugin({
      filename: "css/app.bundle.css",
    }),
  ],
};
