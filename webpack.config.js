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

module.exports = {
  mode: "development",
  output: {
    clean:true
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
        }
    ],
  },
  plugins: [new HtmlWebpackPlugin({ 
    template: './src/index.html',
    // filename: 'index.html' 
}),
new MiniCssExtractPlugin({
  filename: '[name].css',
  ignoreOrder: false
}),
new CopyPlugin({
  patterns: [
    { from: "src/assets/", to: "assets/" },
  ],
})
]
};