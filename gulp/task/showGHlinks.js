const { gitHub, zip, distFolder } = require("../config/path");
const { fileSystem } = require("../modules");
const { sendMessage } = require("../service");
const { FgGreen } = require('../config/colors');

function showGHlinks(done) {
  done();
  const isExistDist = fileSystem.existsSync(distFolder);
  if (!isExistDist) {
    sendMessage(`Path [${distFolder}] is not exist`);
    return;
  }
  const isZipExist = fileSystem.existsSync(zip.srcFile);
  const isIndexExist = fileSystem.existsSync(`${distFolder}/index.html`);
  const title = `New version app at [${gitHub.nameBranch}]`;
  let message = `\n - Branch: ${gitHub.linkBranch}`;
  if (isIndexExist) message += `\n - Deploy: ${gitHub.linkDeploy}`;
  if (isZipExist) message += `\n - Zip: ${gitHub.linkArchive}`;
  sendMessage(title, message, false, FgGreen);
};
module.exports = showGHlinks;