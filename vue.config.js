const path = require('path')
const OS = require('os')
const isPord = process.env.NODE_ENV === 'production'
// console.log('isPord:', isPord)
// 匹配文件开启Gzip
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const webpack = require('webpack')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)
module.exports = {
  publicPath: '/',
  outputDir: process.env.outputDir || 'dist',
  assetsDir: 'assets',
  /**
   * 设置是否在开发环境下每次保存代码时都启用 eslint验证。
   *
   *  false：关闭每次保存都进行检测
   * 'warning'：开启每次保存都进行检测，lint 报错信息将显示到控制台命令行，编译并不会失败。
   * 'true'：与'warning'一样
   * 'default'：开启每次保存都进行检测，lint 报错信息将显示到浏览器页面上，且编译失败
   * 'error'：开启每次保存都进行检测，lint 报错信息以及警告信息将显示到浏览器页面上，且编译失败。
  */
  lintOnSave: false,
  productionSourceMap: !isPord,
  parallel: OS.cpus().length > 1,
  pluginOptions: {}, // 第三方插件,
  css: {
    extract: isPord, // css分离,不支持HMR
    sourceMap: !isPord,
    loaderOptions: {
      sass: {
        // 这个地方是配置全局css的配置，后续不用在引入了，给我记住了！！！
        additionalData: '@import "~@/assets/styles/global.scss";'
      }
    }
  },
  // 链式操作loader规则和插件
  chainWebpack: config => {
    // 这里是项目中别名的配置,文件中可以 @a/xx => src/assets/xx,自己想加在这里配置
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/assets'))
      .set('@v', resolve('src/views'))
      .set('@u', resolve('src/utils'))
      .set('@r', resolve('src/router'))
      .set('@s', resolve('src/store'))
      // .set('lodash', 'lodash-es')

    // 删除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    if (isPord) {
      // 这里为了生产环境更好的压缩图片，减少体积
      config.module
        .rule('images')
        // 这个插件建议用cnpm去安转，如果你build报错，宇波建议你cnpm i image-webpack-loader -D 因为可能你没安装全所有依赖
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
          webp: { quality: 75 } // 大大减少体积，但在ios存在兼容问题，但是宇波及其建议用这个格式
        })
    }
  },
  // webpack 配置 此对象最终被webpack-merge合并到webpack中
  configureWebpack: config => {
    if (isPord) {
      // console.log('production:', config)
      // 为生产环境修改配置...
      config.mode = 'production'
      // 这里是vue-cli4默认有terser 所以直接使用去除多余的console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
      // 这里配置splitchunks  将公用组件 样式等提取出来，减少体积
      config.optimization.splitChunks = {
        chunks: 'async',
        cacheGroups: {
          common: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          vendors: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          moment: {
            name: 'moment',
            test: /[\\/]node_modules[\\/]moment[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: 'all'
          },
          elementUI: {
            name: 'elementplus',
            test: /[\\/]node_modules[\\/]element-plus[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }

      const Plugins = [
        // moment 有各种语言包，总大小200k+，建议过滤掉其他语言
        new webpack.ContextReplacementPlugin(
          /moment[/\\]locale$/, // 这个参数表明了我们要改变的打包上下文
          /zh-cn/ // 这个参数表示我们只想打包这个正则匹配的文件
        ),
        // 打包分析插件 不解释了
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerHost: 'localhost',
          analyzerPort: 3069,
          reportFilename: 'report.html',
          defaultSizes: 'parsed',
          openAnalyzer: false,
          generateStatsFile: false,
          statsFilename: 'stats.json',
          statsOptions: null,
          logLevel: 'info'
        }),
        // 开gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions, // 匹配规则
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
        // // 这个是为了优化lodash包，具体我没了解，网上找的，关心可自行了解,不过跟moment同理我觉得
        // new LodashModuleReplacementPlugin(),
      ]
      // 合并到配置选项的plugins中
      config.plugins = [...config.plugins, ...Plugins]
    } else {
      // 为开发环境修改配置...
      // console.log('develop:', config)
      config.mode = 'development'
    }
  },
  // 这个里配置本地服务的地方，我司这里顶多就用个跨域代理配置，不解释了
  devServer: {
    port: '8989',
    hot: true,
    open: true,
    proxy: {
      '/primaryManager': {
        target: 'https://t-xiaofa-lawyer.aegis-info.com/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '/primaryManager': '/'
        }
      }
    }
  }
}
