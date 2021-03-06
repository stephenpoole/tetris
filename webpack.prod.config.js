var webpack = require('webpack'),
    path = require('path'),
    WebpackStripLoader = require('strip-loader'),
    stripLoader = {
     test: [/\.js$/, /\.es6$/],
     exclude: /node_modules/,
     loader: WebpackStripLoader.loader('console.log')
    },
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
        template: __dirname + '/app/index.html',
        filename: 'index.html',
        inject: 'body'
    })

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "index.js"
  },
  loaders: [
    stripLoader
  ],
  module: {
    loaders: [
     {
      loader: 'script',// script-loader
      test: /(pixi|phaser).js/
    },
    {
        test: /\.js$/,
        exclude: [/node_modules/],
        include: [path.resolve(__dirname, 'app')],
        loader: "babel-loader",
        query: {
            presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.jpg|.jpeg|.png|.gif|.svg$/,
        loader: "file?name=app/assets/[name].[ext]"
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
      mangle: false,
       output: {
          space_colon: false,
          comments: function(node, comment) {
              var text = comment.value;
              var type = comment.type;
              if (type == "comment2") {
                  // multiline comment
                  return /@copyright/i.test(text);
              }
          }
      }
    }),
    HTMLWebpackPluginConfig
  ]
};