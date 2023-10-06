global.isBuild = process.argv.includes('--build');

const { gulp } = require('./gulp/modules');
const path = require('./gulp/config/path');
const task = require('./gulp/task/taskDigest');

function watcher() {
  gulp.watch(path.files.watch, task.copyFiles);
  gulp.watch(path.fonts.watch, task.copyFonts);
  gulp.watch(path.html.watch, task.buildHtml);
  gulp.watch(path.scss.watch, task.buildScss);
  gulp.watch(path.js.watch, task.buildJs);
  gulp.watch(path.img.watch, task.handleImages);
};


const building = gulp.parallel(task.copyFiles, task.copyFonts, task.buildHtml, task.buildScss, task.buildJs, task.handleImages);
const tracking = gulp.parallel(watcher, task.initServer);
const devMode = gulp.series(task.cleanDist, building, tracking);
const buildMode = gulp.series(task.cleanDist, building);
const getFonts = gulp.series(task.convertFonts, task.createFontScss);
const deploy = gulp.series(task.deployGitHub, task.showGHlinks);
const bzdc = gulp.series(buildMode, task.createZip, deploy, task.cleanDist);
const bzd = gulp.series(buildMode, task.createZip, deploy);
const bdc = gulp.series(buildMode, deploy, task.cleanDist);
const bd = gulp.series(buildMode, deploy, task.cleanDist);

// general tasks
exports.default = devMode;
exports.build = buildMode;
exports.deploy = deploy;
exports.fonts = getFonts;
exports.bzdc = bzdc;
exports.bzd = bzd;
exports.bdc = bdc;
exports.bd = bd;

// base tasks
exports.copyFiles = task.copyFiles;
exports.copyFonts = task.copyFonts;
exports.cleanDist = task.cleanDist;
exports.buildHtml = task.buildHtml;
exports.initServer = task.initServer;
exports.buildScss = task.buildScss;
exports.buildJs = task.buildJs;
exports.handleImages = task.handleImages;
exports.convertFonts = task.convertFonts;
exports.createFontScss = task.createFontScss;
exports.deployGitHub = task.deployGitHub;
exports.createZip = task.createZip;
exports.showGHlinks = task.showGHlinks;
