const systemPath = require('path');

const { fontScss } = require('../config/path');
const { fileSystem } = require('../modules');
const { sendMessage } = require('../service');

const config = {
  getDefaultFont(name) {
    const weight = 400;
    const style = 'normal';
    return { name, weight, style };
  },
  fontProperties: {
    100: { weight: 100 },
    200: { weight: 200 },
    300: { weight: 300 },
    400: { weight: 400 },
    500: { weight: 500 },
    600: { weight: 600 },
    700: { weight: 700 },
    800: { weight: 800 },
    900: { weight: 900 },
    thin: { weight: 100 },
    extralight: { weight: 200 },
    light: { weight: 300 },
    regular: { weight: 400 },
    medium: { weight: 500 },
    semibold: { weight: 600 },
    bold: { weight: 700 },
    extrabold: { weight: 800 },
    black: { weight: 900 },
    italic: { style: 'italic' },
    thinitalic: { weight: 100, style: 'italic' },
    extralightitalic: { weight: 200, style: 'italic' },
    lightitalic: { weight: 300, style: 'italic' },
    regularitalic: { weight: 400, style: 'italic' },
    mediumitalic: { weight: 500, style: 'italic' },
    semibolditalic: { weight: 600, style: 'italic' },
    bolditalic: { weight: 700, style: 'italic' },
    extrabolditalic: { weight: 800, style: 'italic' },
    blackitalic: { weight: 900, style: 'italic' },
  },
  getCssCode(font, filename) {
    return `@font-face {
  font-family: '${font.name}';
  font-display: swap;
  src: url('${fontScss.prefix}${filename}.eot');
  src: url('${fontScss.prefix}${filename}.eot') format('embedded-opentype'),
    url('${fontScss.prefix}${filename}.woff2') format('woff2'),
    url('${fontScss.prefix}${filename}.woff') format('woff'),
    url('${fontScss.prefix}${filename}.ttf') format('truetype');
  font-weight: ${font.weight};
  font-style: ${font.style};
}\n`;
  },
  extenstions: ['ttf', 'eot', 'woff', 'woff2'],
};

function getLostExtensions(dirFiles, fileName) {
  const lostExtensions = [];
  for (const extension of config.extenstions) {
    const fullName = `${fileName}.${extension}`;
    if (!dirFiles.includes(fullName)) lostExtensions.push(extension);
  }
  return lostExtensions;
}

function createFontScss(done) {
  const isThereFontsDir = fileSystem.existsSync(fontScss.fonts);
  if (!isThereFontsDir) {
    sendMessage(`'${fontScss.fonts}'`, 'folder is lost.', true);
    return done();
  };
  const dirFiles = fileSystem.readdirSync(fontScss.fonts);
  const ttfFiles = dirFiles.filter(file => systemPath.extname(file) == '.ttf');
  if (!ttfFiles.length) {
    sendMessage(`'${fontScss.fonts}' don't consist [*.ttf] files`, '', true);
    return done();
  };
  if (!fileSystem.existsSync(fontScss.folder)) fileSystem.mkdirSync(fontScss.folder);
  if (fileSystem.existsSync(fontScss.file)) fileSystem.rmSync(fontScss.file);
  fileSystem.writeFileSync(fontScss.file, '');
  const fileNames = ttfFiles.map(name => systemPath.basename(name, '.ttf'));
  for (const fileName of fileNames) {
    const [name, ...params] = fileName.split('-');
    const targetFont = config.getDefaultFont(name);

    const lostExtensions = getLostExtensions(dirFiles, fileName);
    if (lostExtensions.length)
      sendMessage(`${fileName}.[${lostExtensions}] is lost`, '', true);

    while (params.length) {
      const param = params.pop().toLowerCase();
      if (config.fontProperties[param]) {
        Object.assign(targetFont, config.fontProperties[param]);
      } else {
        sendMessage(`[${param}] is undefined`, `for '${fileName}'. Used default property.`, true);
      }
    };
    const cssCode = config.getCssCode(targetFont, fileName);
    fileSystem.appendFileSync(fontScss.file, cssCode);
  };
  done();
};
module.exports = createFontScss;
