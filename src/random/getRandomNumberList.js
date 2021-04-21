const getRandomNumber = require('./getRandomNumber');

function getRandomNumberList(numberTotal, numberLength) {
  const list = [];

  for (let i = 0; i < numberTotal; i++) {
    list.push(getRandomNumber(numberLength));
  }

  return list;
}

module.exports = getRandomNumberList;
