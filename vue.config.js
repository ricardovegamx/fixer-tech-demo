module.exports = {
  configureWebpack: {
    // Disable splitChunks to get a single minified file
    optimization: {
      splitChunks: false
    },
  },

  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  css: undefined
};
