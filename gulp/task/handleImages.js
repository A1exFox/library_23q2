const imagemin = require('gulp-imagemin');
const imgToWebp = require('gulp-webp');
const imgToAvif = require('gulp-avif');

const { img } = require('../config/path');
const { gulp, server, changed, gulpif } = require('../modules');
const { plumberNotify } = require('../service');

const config = {
  imageMin: [
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 90, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: false },
        { cleanupIDs: false }
      ]
    })
  ],
  avif: { quality: 70, },
  webp: { quality: 80, },
};

function compressImages() {
  return gulp.src(img.srcFiles)
    .pipe(plumberNotify('IMAGES compressing'))
    .pipe(imagemin(config.imageMin))
    .pipe(gulp.dest(img.distFolder));
};
function imagesToWebp() {
  return gulp.src(img.compressedFiles)
    .pipe(plumberNotify('IMAGES toWEBP'))
    .pipe(imgToWebp(config.webp))
    .pipe(gulp.dest(img.distFolder));
};
function imagesToAvif() {
  return gulp.src(img.compressedFiles)
    .pipe(plumberNotify('IMAGES toAVIF'))
    .pipe(imgToAvif(config.avif))
    .pipe(gulp.dest(img.distFolder));
};
function copyIcons() {
  return gulp.src(img.srcIcon)
    .pipe(plumberNotify('ICONS copy'))
    .pipe(gulp.dest(img.distFolder));
};
function copyImages() {
  return gulp.src([img.srcFiles, img.srcIcon, img.srcModern])
    .pipe(plumberNotify('IMAGES'))
    .pipe(changed(img.distFolder))
    .pipe(gulp.dest(img.distFolder))
}
function serverReload(done) {
  server.reload();
  done();
};

const buildMode = gulp.series(
  compressImages,
  imagesToWebp,
  imagesToAvif,
  copyIcons,
);
const devMode = gulp.series(copyImages, serverReload);

module.exports = isBuild ? buildMode : devMode;
