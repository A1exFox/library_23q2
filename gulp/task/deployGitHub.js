const deploy = require('gulp-gh-pages');

const { gulp, fileSystem } = require('../modules');
const { gitHub, zip, distFolder } = require('../config/path');

let currentTime = null;

const config = {
  getDeploy() {
    currentTime = currentTime || getDateTime();
    return {
      message: `update: [UTC: ${currentTime}]`,
      branch: `${gitHub.nameBranch}`,
    }
  }
};

function getReadme() {
  currentTime = currentTime || getDateTime();
  const isZipExist = fileSystem.existsSync(zip.srcFile);
  const isIndexExist = fileSystem.existsSync(`${distFolder}/index.html`);
  let content = `## ${gitHub.nameRepo} [last update: ${currentTime}]\n\n`;
  if (isIndexExist) content += `- Deploy: ${gitHub.linkDeploy}\n`;
  if (isZipExist) content += `- Archive: ${gitHub.linkArchive}`;
  return content;
};

function getDateTime() {
  const date = new Date();
  const year = String(date.getUTCFullYear()).slice(-2);
  const month = String(date.getUTCMonth()).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const dateTime = `${month}.${day}.${year} ${hours}:${minutes}:${seconds}`;
  return dateTime;
};
function removeReadme(done) {
  const isFileExist = fileSystem.existsSync(gitHub.srcReadme);
  if (isFileExist) fileSystem.rmSync(gitHub.srcReadme);
  done();
}
function createReadme(done) {
  currentTime = getDateTime();
  fileSystem.writeFileSync(gitHub.srcReadme, getReadme());
  done();
}
function deployProcess() {
  return gulp.src(gitHub.srcFiles)
    .pipe(deploy(config.getDeploy()));
};

const deployGitHub = gulp.series(createReadme, deployProcess, removeReadme)
module.exports = deployGitHub;