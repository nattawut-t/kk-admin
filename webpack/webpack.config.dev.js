const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolve = path.resolve;

const sourcePath = path.join(__dirname, '../src');

module.exports = {
  context: sourcePath,
  entry: [
    // 'webpack-dev-server/client',
    // 'webpack/hot/only-dev-server',
    resolve(__dirname, 'hotReload'),
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  // context: resolve(__dirname, '../src'),
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    contentBase: resolve(__dirname, '../assets'),
    publicPath: '/',
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, '../src'), resolve(__dirname)],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(jpg|pdf|gif|png|svg|woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name]-[hash:8].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [
      '.webpack-loader.js',
      '.web-loader.js',
      '.loader.js',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    modules: [
      resolve(__dirname, '../node_modules'),
      resolve(__dirname, '../src'),
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Money Table',
      template: '../webpack/template.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test'),
      },
    }),
  ],
  performance: { hints: false },
};
