const config = {
  mode: isBuild ? 'production' : 'development',
  // mode: 'development',
  entry: {
    app: './src/js/app.js',
    setSupportImg: './src/js/setSupportImg.js',
  },
  output: {
    filename: '[name].js',
  },
  // module: {
  //   rules: [{
  //     test: /\.css$/,
  //     use: ['style-loader', 'css-loader'],
  //   }],
  // },
};
module.exports = config;