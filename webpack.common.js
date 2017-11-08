const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = path

module.exports = {
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            // loader: 'url-loader'
            loader: 'file-loader',
            // options: {
            //   name: './img/[name].[hash].[ext]'
            // }
          }
        ]
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: resolve(__dirname + '/index.html'),
      title: 'Admin Application'
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist')
  }
}