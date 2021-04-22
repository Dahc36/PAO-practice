const getBenfordsDigit = require('./getBenfordsDigit');
const getRandomDigit = require('./getRandomDigit');

function getRandomNumber(numberLength) {
  if (numberLength <= 0) {
    return null;
  }

  let length = Math.floor(Math.random() * numberLength + 1);
  let number = 0;
  for (i = 0; i < length; i++) {
    const digit = i === 0 ? getBenfordsDigit() : getRandomDigit();
    number += digit * Math.pow(10, length - 1 - i);
  }

  return number;
}

module.exports = getRandomNumber;
