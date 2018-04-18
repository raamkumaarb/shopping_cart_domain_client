const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const validate = require('webpack-validator')
const parts = require('./libs/parts.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TARGET = process.env.npm_lifecycle_event
var env
const PATHS = {
  app: path.join(__dirname, 'src'),
  style: [path.join(__dirname, 'src/static/scss/main.scss')],
  vendor: path.join(__dirname, 'src/static/js'),
  build: path.join(__dirname, 'build')
}
var config
const common = {
  entry: {
    style: PATHS.style,
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json/,
        loaders: ['json-loader'],
        exclude: /node_modules/
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.js$/,
        include: [
          PATHS.vendor
        ],
        loader: 'script'
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
    fallback: path.join(__dirname, 'node_modules')
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SESprout',
      template: 'index-dev.html' // Load a custom template (ejs by default but can be changed)
    })
  ]
}

switch(TARGET) {
  case 'build-test':
  env =  parts.setFreeVariable(
      'process.env.NODE_ENV',
      'staging'
    )
  break
case 'stats':
case 'build':
  env =  parts.setFreeVariable(
      'process.env.NODE_ENV',
      'production'
    )
}

switch(TARGET) {
case 'build-test':
case 'build':
case 'stats':
  config = merge(common,
   env,
    {
      devtool: 'source-map'
    },
    {
      output: {
        path: PATHS.build,
        filename: '[name].[chunkhash].js',
        chunkFilename: '[chunkhash].js'
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
          title: 'SESprout',
          template: 'index-build.html'
        }),
        new CopyWebpackPlugin([
          { from: 'maintanence_off.html',
            to: 'maintanence_off.html' }])
      ],
      module: {
        loaders: [{
          test: /\.jsx?$/,
          include: PATHS.app,
          loaders: ['babel']
        },
        {
          test: /\.jsx?$/,
          include: PATHS.app,
          loader: 'strip-loader?strip[]=debug,strip[]=console.log'
        }]
      }
    },
    parts.clean(PATHS.build),
    parts.extractCSS(PATHS.style),
    // parts.purifyCSS([PATHS.app]),
    parts.extractBundle({
      name: 'vendor',
      entries: ['react', 'redux',
      'react-dom']
    }),
    parts.minify())
  break
default:
  config = merge(common, parts.setupCSS(PATHS.style),
  {
    entry: [
     'webpack/hot/only-dev-server',
     './src/index.js'
   ],
  output: {
    path: path.resolve( __dirname, 'dev/build'),
    publicPath: '/',
    filename: 'bundle.js'
  }
},
    parts.devServer({
      host: '127.0.0.1',
      port: '8082',
      path: path.resolve(__dirname)
    }),
    {
      module: {
        loaders: [{
          test: /\.jsx?$/,
          include: PATHS.app,
          loaders: ['react-hot', 'babel']
        }]
      }
    })
}

module.exports = validate(config, { quiet: true })
