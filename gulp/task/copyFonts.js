const { gulp, server, changed, gulpif } = require('../modules');
const { fonts } = require('../config/path');
const { plumberNotify } = require('../service');

function copyFonts() {
  return gulp.src(fonts.src)
    .pipe(plumberNotify('COPY FONTS'))
    .pipe(gulpif(!isBuild, changed(fonts.dist)))
    .pipe(gulp.dest(fonts.dist))
};
function serverReload(done) {
  server.reload();
  done();
};
const devMode = gulp.series(copyFonts, serverReload);
module.exports = isBuild ? copyFonts : devMode;