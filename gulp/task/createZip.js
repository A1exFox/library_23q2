const zipModule = require('gulp-zip');

const { zip, distFolder } = require('../config/path');
const { gulp } = require('../modules');

function createZip() {
  return gulp.src(zip.buildFiles)
    .pipe(zipModule(zip.fileName))
    .pipe(gulp.dest(distFolder));
};
module.exports = createZip;