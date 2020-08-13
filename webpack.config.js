const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './extension/app/index.jsx'),
    // background: path.resolve(__dirname, './extension/background.js'),
    // content: path.resolve(__dirname, './extension/contentScript.js'),
  },
  output: {
    path: path.join(__dirname, './extension/build/bundles'),
    filename: '[name].bundle.js', // full name will be extension/build/bundles/[name].bundle.js
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-module-source-map', // changes style of source mapping to avoid using eval
};
