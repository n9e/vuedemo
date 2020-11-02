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
  css: {
    extract: false, // 把css动态注入到js中
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
      libraryTarget: 'amd',
      filename: `${pkgJson.systemName}.[chunkhash].js`
    },
    plugins: [
      // new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: `${pkgJson.systemName}-[chunkhash].css`,
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
    config.plugin('html')
      .tap(args => {
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
    //config.optimization.delete('splitChunks'); //由于微前端架构要求只有一个入口的js和css，所以如果是有的话需要进行关闭，打开注释；关闭代码分离，只生成一个js文件和css文件
  }
}
