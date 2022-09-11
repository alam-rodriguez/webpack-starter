// const HtmlWebPackPlugin = require('html-webpack-plugin');

// module.exports = {

//     mode: 'development',
//     module: {
//         rules: [
//             {
//                 test: /\.html$/i,
//                 loader: 'html-loader',
//                 options: {
//                     attributes: false,
//                 },
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebPackPlugin({
//             template: './src/index.html',
//             filename: './index.html'
//         }),
//     ],


// }


// const path = require('path');

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//   },
// };

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMInimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin')

module.exports = {
  mode: "production",
  output: {
    clean:true,
    filename: 'main.[contenthash].js'
  },
  module: {
    rules: [
        { 
            test: /\.txt$/,
             use: 'raw-loader' 
        },
        {
          test: /\.css$/,
          exclude: /styles.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /styles.css$/,
          use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
        },
        {
          test: /\.(png|jpg?g|gif)$/,
          loader: 'file-loader'
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMInimizer(),
      new Terser()
    ]
  },
  plugins: [new HtmlWebpackPlugin({ 
    template: './src/index.html',
    // filename: 'index.html' 
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[fullhash].css',
    ignoreOrder: false
  }),
  new CopyPlugin({
    patterns: [
      { from: "src/assets/", to: "assets/" },
    ],
  })
  ]
};