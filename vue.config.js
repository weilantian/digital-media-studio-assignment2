// vue.config.js
const forSharing = true

const path = forSharing? './':'/~s3882916/'
/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? path: '/'
  }