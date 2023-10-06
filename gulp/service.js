const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const notifier = require('node-notifier');

const { Reset, FgRed, BgYellow } = require('./config/colors');

const service = {
  plumberNotify(title) {
    return plumber(notify.onError({
      title,
      message: '<%= error.message %>',
    }));
  },
  sendMessage(title, message, notify, colorCustom) {
    if (!title && !message) return;
    let content = '';
    let consoleMessage = '';
    if (title && message) content = `\n> ${title}: ${message}\n`;
    if (title && !message) content = `\n> ${title}\n`;
    if (!title && message) content = `\n> ${message}\n`;
    consoleMessage = content;
    if (colorCustom && !notify) consoleMessage = `${colorCustom}${content}${Reset}`;
    if (notify) consoleMessage = `${FgRed}${content}${Reset}`;
    console.log(consoleMessage);
    if (!notify) return;
    title = title || ' ';
    message = message || ' ';
    notifier.notify({ title, message });
  },
};
module.exports = service;