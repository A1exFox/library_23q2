const gulp = require('gulp');
const fileSystem = require('fs');
const server = require('browser-sync').create();
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const gulpif = require('gulp-if');
const clean = require('gulp-clean');

const modules = {
  gulp,
  fileSystem,
  server,
  replace,
  rename,
  changed,
  gulpif,
  clean,
};
module.exports = modules;