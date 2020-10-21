'use strict'
const path = require('path')
const StatsPlugin = require('stats-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const pkgJson = require('./package.json')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = 'demo' // page title
const port = 8090 // dev port

// // 使用 git commitId 作为 hash
const manifestName = `manifest.json`

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? `http://localhost:${port}/${pkgJson.systemName}/` : `/${pkgJson.systemName}/`,
  outputDir: `pub/${pkgJson.systemName}`,
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    disableHostCheck: true,
    historyApiFallback: true,
    // proxy: proxyMap,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    devtool: 'none',
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        'bcomponents': resolve('src/business-components')
      }
    },
    output: {
      library: `${pkgJson.systemName}`,
      libraryTarget: 'amd'
    },
    plugins: [
      // new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name]-[chunkhash].css',
        chunkFilename: '[name]-[chunkhash].css'
      }),
      new StatsPlugin(manifestName, {
        chunkModules: false,
        source: true,
        chunks: false,
        modules: false,
        assets: true,
        children: false,
        exclude: [/node_modules/]
      })
    ]
  },

  chainWebpack (config) {
    const cdn = {
      // why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
      js: []
    }
    config.plugin('html')
      .tap(args => {
        args[0].cdn = cdn
        args[0].meta = {
          manifest: manifestName
        }
        if (process.env.NODE_ENV !== 'development') args[0].minify.removeAttributeQuotes = false
        return args
      })
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
  }
}
