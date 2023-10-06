const { gulp, clean } = require('../modules');
const { distFolder } = require('../config/path');

function cleanDist() {
  return gulp.src(distFolder, { read: false, allowEmpty: true })
    .pipe(clean());
};
module.exports = cleanDist;