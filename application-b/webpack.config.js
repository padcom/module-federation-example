const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  mode,
  entry: './src/index',
  output: {
    publicPath: 'http://localhost:3002/',
  },
  devtool: 'source-map',
  devServer: {
    port: 3002,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
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
      name: 'application_b',
      filename: 'remoteEntry.js',
      exposes: {
        './main': './src/app',
      },
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
