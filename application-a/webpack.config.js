const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  mode,
  entry: './src/index',
  output: {
    publicPath: 'http://localhost:3001/',
  },
  devtool: 'source-map',
  devServer: {
    port: 3001
  },
  optimization: {
    minimize: mode === 'production',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'application_a',
      filename: 'remoteEntry.js',
      shared: [
        'react',
        'react-dom'
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
