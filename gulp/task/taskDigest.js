const copyFiles = require('./copyFiles');
const copyFonts = require('./copyFonts');
const cleanDist = require('./cleanDist');
const buildHtml = require('./buildHtml');
const initServer = require('./initServer');
const buildScss = require('./buildScss');
const buildJs = require('./buildJs');
const handleImages = require('./handleImages');
const convertFonts = require('./convertFonts');
const createFontScss = require('./createFontScss');
const deployGitHub = require('./deployGitHub');
const createZip = require('./createZip');
const showGHlinks = require('./showGHlinks');

const taskDigest = {
  copyFiles,
  copyFonts,
  cleanDist,
  buildHtml,
  initServer,
  buildScss,
  buildJs,
  handleImages,
  convertFonts,
  createFontScss,
  deployGitHub,
  createZip,
  showGHlinks,
}
module.exports = taskDigest;