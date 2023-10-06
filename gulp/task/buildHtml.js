const fileInclude = require('gulp-file-include');
const imgToWebImages = require('gulp-avif-webp-html');
const version = require('gulp-version-number');

const { gulp, server, replace, changed, gulpif } = require('../modules');
const { html } = require('../config/path');
const { alias, commentHtml } = require('../config/replaceRules');
const { plumberNotify } = require('../service');

const config = {
  version: {
    append: {
      to: ['css', 'js'],
    },
  },
  changed: { hasChanged: changed.compareContents },
};

function buildHtml() {
  return gulp.src(html.srcFiles)
    .pipe(plumberNotify('HTML build'))
    .pipe(fileInclude())
    .pipe(gulpif(isBuild, replace(commentHtml.regex, commentHtml.value)))
    .pipe(replace(alias.nst.regex, alias.nst.value))
    .pipe(gulpif(isBuild, imgToWebImages()))
    .pipe(gulpif(isBuild, version(config.version)))
    .pipe(gulpif(!isBuild, changed(html.distFolder, config.changed)))
    .pipe(gulp.dest(html.distFolder))
    .pipe(server.stream())

};
module.exports = buildHtml;