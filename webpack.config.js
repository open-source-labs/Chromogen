const path = require('path');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const config = {
  entry: {
    app: path.resolve(__dirname, './extension/app/index.tsx'),
    background: path.resolve(__dirname, './extension/background.js'),
    content: path.resolve(__dirname, './extension/content.js'),
  },
  output: {
    path: path.join(__dirname, './extension/build/bundles'),
    filename: '[name].bundle.js', // full name will be extension/build/bundles/[name].bundle.js
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },

      // addition - add source-map support
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['@babel/preset-env', '@babel/preset-react'],
      //   },
      // },
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
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  resolve: {
    // changed from extensions: [".js", ".jsx"]
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: []
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.plugins.push(
      new ChromeExtensionReloader({
        entries: {
          contentScript: ['app', 'content'],
          background: ['background'],
        },
      }),
    );
  }
  return config;
};
