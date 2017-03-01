var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  resolve: {
    root: [
      path.resolve('./src/global/components'),
      path.resolve('./src/global/supports'),
    ],
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    path.resolve('', 'src/test.jsx')
  ],
  output: {
    path: __dirname + '/release',
    filename: 'bundle.js',
    chunkFilename: '[id].[chunkhash:4].js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      },
      loaders: [
        'babel?presets[]=react,presets[]=es2015,presets[]=stage-2'
      ]
    }, {
      test: /\.(jpg|png)$/,
      loader: "url?limit=8192"
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /.css$/, // Only .css files
      loader: 'style!css' // Run both loaders
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production") //部署时用
    }),
    new webpack.optimize.DedupePlugin() //找相等或近似的模块，避免在最终生成的文件中出现重复的模块
  ]
};
