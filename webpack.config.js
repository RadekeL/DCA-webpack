const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
    rules: [{
      test: /\.s(a|c)ss$/,
      use: [
        isProduction
        ? MiniCssExtractPlugin.loader
        : { loader: 'style-loader', options: { sourceMap: true } },
        { loader: 'css-loader', options: { sourceMap: isProduction } },
        { loader: 'postcss-loader', options: { sourceMap: isProduction } },
        { loader: 'sass-loader', options: { sourceMap: isProduction } }
      ]
      }],
},
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output; optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
};