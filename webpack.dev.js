const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { resolve } = path

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    // hot: true,
    inline: true,
    host: '0.0.0.0',
    contentBase: './assets',
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev'),
        'ADMIN_URL': JSON.stringify('https://dev-api.moneytable.com'),
      },
    }),
  ],
})