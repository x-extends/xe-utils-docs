const { defineConfig } = require('@vue/cli-service')
const XEUtils = require('xe-utils')

process.env.VUE_APP_PAGE_TITLE = 'XE 函数库工具类'
process.env.VUE_APP_DATE_NOW = Date.now()
process.env.VUE_APP_DATE_DATE = XEUtils.toDateString(process.env.VUE_APP_DATE_NOW, 'yyyy-MM-dd HH:mm:ss')

module.exports = defineConfig({
  publicPath: '/xe-utils/',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    port: 8100,
    proxy: {
      '/example/': {
        target: 'https://vxeui.com',
        pathRewrite: {
          '^/example/': '/example/'
        }
      },
      '/component-api/': {
        target: 'https://vxeui.com',
        pathRewrite: {
          '^/component-api/': '/component-api/'
        }
      },
      '/resource/': {
        target: 'https://vxeui.com',
        pathRewrite: {
          '^/resource/': '/resource/'
        }
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: `${process.env.VUE_APP_PAGE_TITLE}`
    }
  },
  configureWebpack: {
    performance: {
      hints: false
    },
    externals: {
      axios: 'axios'
    }
  },
  chainWebpack (config) {
    // 移除
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  }
})
