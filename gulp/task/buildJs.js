// включить режим production or develop
const webpack = require('webpack-stream');
const babel = require('gulp-babel');

const { gulp, server, changed, gulpif } = require('../modules');
const { js } = require('../config/path');
const webpackConfig = require('../../webpack.config');
const { plumberNotify } = require('../service');

const config = {
  babel: {
    presets: ['@babel/preset-env'],
  },
  changed: { hasChanged: changed.compareContents },
}

function buildJs() {
  return gulp.src(js.srcFiles)
    .pipe(plumberNotify('JS build'))
    .pipe(webpack(webpackConfig))
    .pipe(gulpif(isBuild, babel(config.babel)))
    .pipe(gulpif(!isBuild, changed(js.distFolder, config.changed)))
    .pipe(gulp.dest(js.distFolder))
    .pipe(server.stream());
};
module.exports = buildJs;