// const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path/posix');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, 'client', "index.js"),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
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
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: path.join(__dirname, "client", "index.html"),
    }),
  ],
  devServer: {
    host: "localhost",
    port: 8080,
    static: {
      publicPath: "/",
      directory: path.resolve(__dirname, "dist"),
    },
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "/": {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },

};
