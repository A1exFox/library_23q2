const replaceRules = {
  alias: {
    nst: {
      regex: /@nst/g,
      value: '.',
    },
  },
  commentHtml: {
    regex: /<!--[^-]*-->/g,
    // regex: /<!--.*?-->/gsm,
    value: '',
  },

};
module.exports = replaceRules;