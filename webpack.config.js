var path = require('path');
var webpack = require('webpack');
module.exports = {
  //entry:path.resolve('','src/main.js'),
  resolve: {
    root: [
      path.resolve('./src/global/components'),
      path.resolve('./src/global/supports'),
    ],
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8081',
    // path.resolve('', 'src/main.js')//for publish
    path.resolve('', 'src/test.jsx')//for text
  ],
  output: {
    path: path.resolve('', 'build'),
    filename: 'bundle.js'
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
        //compact: false
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
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
