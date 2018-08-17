module.exports = {
  configureWebpack: {
    // Disable splitChunks to get a single minified file
    optimization: {
      splitChunks: false
    },
  },  
  productionSourceMap: false,
};
