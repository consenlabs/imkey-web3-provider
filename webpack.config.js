var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = ["source-map"].map((devtool) => ({
  mode: "development",
  entry: "./src/demo",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "imkey-web3-provider.js",
    library: "imKeyWeb3Provider",
    // libraryTarget: 'var'
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "管理输出",
    }),
  ],
  devtool,
  optimization: {
    runtimeChunk: true,
  },
  devServer: {
    contentBase: "./dist",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"],
      },
    ],
  },
}));

// module.exports = {
//     // Change to your "entry-point".
//     entry: './src/index',
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'imkey-web3-provider.js'
//     },
//     devServer: {
//         contentBase: './dist',
//     },
//     resolve: {
//         extensions: ['.ts', '.tsx', '.js', '.json']
//     },
//     module: {
//         rules: [{
//             // Include ts, tsx, js, and jsx files.
//             test: /\.(ts|js)x?$/,
//             exclude: /node_modules/,
//             loader: 'babel-loader',
//         }],
//     }
// };
