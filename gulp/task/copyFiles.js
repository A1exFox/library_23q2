const { gulp, server, changed, gulpif } = require('../modules');
const { files } = require('../config/path');
const { plumberNotify } = require('../service');

function copyFiles() {
  return gulp.src(files.srcFiles)
    .pipe(plumberNotify('COPY FILES'))
    .pipe(gulpif(!isBuild, changed(files.distFolder)))
    .pipe(gulp.dest(files.distFolder));
};
function serverReload(done) {
  server.reload();
  done();
};
const devMode = gulp.series(copyFiles, serverReload)
module.exports = isBuild ? copyFiles : devMode;