const path = require("path");
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  mode: "development",
  context: path.join(__dirname, "src"),
  entry: {
    app: "./client.js",
  },
  resolve: {
    modules: [path.resolve("./src"), "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [new LoadablePlugin()]
};
