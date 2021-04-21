const colors = require('colors/safe');

const {
  DEFAULT_NUMBERS,
  DEFAULT_NUMBER_LENGTH,
  DEFAULT_TIME_TO_MEMORIZE,
  DEFAULT_TIME_TO_WAIT,
} = require('./constants');
const getRandomNumberList = require('./random/getRandomNumberList');
const userPrompt = require('./userPrompt/userPrompt');

function memorize(list, timeToMemorize) {
  return new Promise((resolve) => {
    let timePassed = 0;
    const intervalId = setInterval(() => {
      if (timePassed >= timeToMemorize) {
        clearInterval(intervalId);
        resolve();
      }

      console.clear();
      console.log(`Here's the list`);
      for (const number of list) {
        console.log(number);
      }
      console.log(`Time left to memorize: ${timeToMemorize - timePassed}`);
      timePassed++;
    }, 1000);
  });
}

async function wait(timeToWait) {
  return new Promise((resolve) => {
    let timePassed = 0;
    const intervalId = setInterval(() => {
      if (timePassed >= timeToWait) {
        clearInterval(intervalId);
        resolve();
      }

      console.clear();
      console.log(`Time left waiting: ${timeToWait - timePassed}`);
      timePassed++;
    }, 1000);
  });
}

async function play(numbersTotal) {
  return new Promise((resolve) => {
    const userList = [];
    console.log(`Time to remember`);
    for (let i = 0; i < numbersTotal; i++) {
      const number = userPrompt(`${i + 1}th number: `);
      userList.push(number);
    }
    resolve(userList);
  });
}

async function app({
  numbersTotal = DEFAULT_NUMBERS,
  numberLength = DEFAULT_NUMBER_LENGTH,
  timeToMemorize = DEFAULT_TIME_TO_MEMORIZE,
  timeToWait = DEFAULT_TIME_TO_WAIT,
}) {
  const list = getRandomNumberList(numbersTotal, numberLength);

  await memorize(list, timeToMemorize, wait);

  await wait(timeToWait);

  const userList = await play(numbersTotal);

  console.clear();
  console.log('Results');
  let rightValues = 0;
  for (const [index, value] of userList.entries()) {
    if (value == list[index]) {
      console.log(colors.green(value));
      rightValues++;
    } else {
      console.log(`${colors.red(value)} (${list[index]})`);
    }
  }
  if (rightValues === list.length) {
    console.log(colors.bgGreen('Congratulations!'));
    console.log(`You're the king of the world!`);
  } else {
    console.log(colors.bgRed('Congratulations!'));
    console.log('You suck!');
  }
}

module.exports = app;
