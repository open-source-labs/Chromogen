// const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ["regenerator-runtime/runtime.js", path.join(__dirname, 'client', "index.js")],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ['@babel/plugin-syntax-jsx'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: path.resolve('./tsconfig.json')
          }
        }
      },
      {
        test: /.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    // proxy: {
    //   "/info/**": {
    //     target: 'http://localhost:3000',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // },
    static: {
      directory: path.resolve(__dirname, '/client'),
      publicPath: '/build'
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    port: 8080,
    host: 'localhost'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: path.join(__dirname, "client", "index.html"),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },

}



