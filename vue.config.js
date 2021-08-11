module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "webpack.html"
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: tag => tag.startsWith('amplify-')
        };
        return options;
      });
  }
};