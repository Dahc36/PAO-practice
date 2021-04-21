const prompt = require('prompt-sync')();

function promptUser(message) {
  return prompt(message);
}

module.exports = promptUser;
