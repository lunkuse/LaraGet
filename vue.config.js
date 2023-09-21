const webpack = require('webpack')

require('dotenv').config()

module.exports = {
  parallel: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        cash: 'cash-dom',
        Popper: '@popperjs/core'
      })
    ]
  }
}
