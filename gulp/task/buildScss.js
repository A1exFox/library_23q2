const scssToCss = require('gulp-sass')(require('sass'));
const sourceMaps = require('gulp-sourcemaps');
const groupMediaQueries = require('gulp-group-css-media-queries');
const webpCss = require('gulp-webpcss');
const avifCss = require('gulp-web-images-css');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');

const { gulp, replace, rename, server, changed, gulpif } = require('../modules');
const { scss } = require('../config/path');
const { plumberNotify } = require('../service');
const { alias } = require('../config/replaceRules');

const config = {
  rename: {
    extname: '.min.css',
  },
  supportWebp: {
    webpClass: '.webp',
    noWebpClass: '.no-webp',
  },
  supportAvif: {
    mode: 'avif',
  },
  autoprefixer: {
    grid: true,
    overrideBrowserslist: ['last 5 versions'],
    cascade: true,
  },
  changed: { hasChanged: changed.compareContents },

}

function buildScss() {
  return gulp.src(scss.srcFiles)
    .pipe(plumberNotify('SCSS build'))
    .pipe(gulpif(!isBuild, sourceMaps.init()))
    .pipe(scssToCss())
    .pipe(gulpif(!isBuild, sourceMaps.write()))
    .pipe(replace(alias.nst.regex, alias.nst.value))

    .pipe(gulpif(isBuild, groupMediaQueries()))
    .pipe(gulpif(isBuild, avifCss(config.supportAvif)))
    .pipe(gulpif(isBuild, webpCss(config.supportWebp)))
    .pipe(gulpif(isBuild, autoprefixer(config.autoprefixer)))
    // .pipe(gulp.dest(scss.distFolder))
    // .pipe(cleanCss())

    .pipe(rename(config.rename))
    .pipe(gulp.dest(scss.distFolder))
    .pipe(server.stream());
};
module.exports = buildScss;