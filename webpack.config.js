const path = require('path');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const config = {
  entry: {
    app: path.resolve(__dirname, './extension/app/index.tsx'),
    background: path.resolve(__dirname, './extension/background.ts'),
    content: path.resolve(__dirname, './extension/content.ts'),
  },
  output: {
    path: path.join(__dirname, './extension/build/bundles'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'ts-loader' }, exclude: /node_modules/ },
      { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'source-map-loader' },
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
