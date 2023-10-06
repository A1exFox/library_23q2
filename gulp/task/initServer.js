const { server } = require('../modules');
const { distFolder } = require('../config/path');

const configServer = {
  server: {
    baseDir: distFolder,
  },
  notify: false,
};

function initServer() {
  server.init(configServer);
};
module.exports = initServer;