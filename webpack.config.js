var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './jsx/main.jsx',
  output: { path: './memoboard/static/js/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
      test: /\.json$/,
      loader: 'json'
    }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
    ],
    resolve: {
    alias: {
        'react': 'react-lite',
        'react-dom': 'react-lite'
    }
    }
};