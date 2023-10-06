const ttf2eot = require('gulp-ttf2eot');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const { gulp, fileSystem } = require('../modules');
const { fonts } = require('../config/path');
const { plumberNotify, sendMessage } = require('../service');

function convertFonts(done) {
  const isThereFontDir = fileSystem.existsSync(fonts.target);
  if (!isThereFontDir) {
    sendMessage(`'${fonts.target}'`, 'is not found', true);
    return done();
  };
  return gulp.src(fonts.ttf)
    .pipe(plumberNotify('font convert'))
    .pipe(ttf2eot())
    .pipe(gulp.dest(fonts.target))
    .pipe(gulp.src(fonts.ttf))
    .pipe(ttf2woff())
    .pipe(gulp.dest(fonts.target))
    .pipe(gulp.src(fonts.ttf))
    .pipe(ttf2woff2())
    .pipe(gulp.dest(fonts.target));
};
module.exports = convertFonts;