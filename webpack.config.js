const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    contentBase: __dirname + "/dist",
    index: "index.html",
    port: 9000
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new CopyWebpackPlugin([{ from: "./src/3d/models", to: "models" }])
  ],
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loaders: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader", "glslify-loader"]
      },
      {
        test: /.(png|jpe?g)$/,
        use: ["url-loader"]
      }
    ]
  }
};
