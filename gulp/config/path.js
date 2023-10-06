const { nameRepo, developer, nameBranch } = require('../../git.info');

const srcFolder = './src';
const distFolder = isBuild ? './build' : './dist';

const path = {
  distFolder,
  files: {
    srcFiles: `${srcFolder}/files/**/*`,
    distFolder: `${distFolder}/files/`,
    watch: `${srcFolder}/files/**/*`,
  },
  html: {
    srcFiles: `${srcFolder}/*.html`,
    distFolder: `${distFolder}/`,
    watch: `${srcFolder}/**/*.html`,
  },
  scss: {
    srcFiles: `${srcFolder}/scss/style.scss`,
    distFolder: `${distFolder}/css`,
    watch: `${srcFolder}/scss/**/*.scss`,
  },
  js: {
    srcFiles: `${srcFolder}/js/*.js`,
    distFolder: `${distFolder}/js`,
    watch: `${srcFolder}/js/**/*.js`,
  },
  img: {
    srcFiles: `${srcFolder}/img/**/*.{jpg,jpeg,gif,png}`,
    compressedFiles: `${distFolder}/img/**/*.{jpg,jpeg,gif,png}`,
    srcIcon: `${srcFolder}/img/**/*.{svg,ico}`,
    srcModern: `${srcFolder}/img/**/*.{webp,avif}`,
    distFolder: `${distFolder}/img`,
    watch: `${srcFolder}/img/**/*.{jpg,jpeg,gif,png,svg,ico,webp,avif}`,
  },
  fonts: {
    src: `${srcFolder}/fonts/**/*.{ttf,eot,woff,woff2}`,
    dist: `${distFolder}/fonts/`,
    ttf: `${srcFolder}/fonts/*.ttf`,
    target: `${srcFolder}/fonts`,
    watch: `${srcFolder}/fonts/**/*`,
  },
  fontScss: {
    prefix: `../fonts/`,
    fonts: `${srcFolder}/fonts`,
    folder: `${srcFolder}/scss`,
    file: `${srcFolder}/scss/fonts.scss`,
  },
  zip: {
    srcFile: `${distFolder}/${nameRepo}.zip`,
    fileName: `${nameRepo}.zip`,
    buildFiles: [
      `${distFolder}/**/*`,
      `!${distFolder}/readme.md`,
      `!${distFolder}/${nameRepo}.zip`],
  },
  gitHub: {
    nameRepo,
    nameBranch,
    srcFiles: `${distFolder}/**/*`,
    srcReadme: `${distFolder}/readme.md`,
    linkBranch: `https://github.com/${developer}/${nameRepo}/tree/${nameBranch}`,
    linkDeploy: `https://${developer}.github.io/${nameRepo}/`,
    linkArchive: `https://${developer}.github.io/${nameRepo}/${nameRepo}.zip`,
  }

}
module.exports = path;