const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const app = require('./src/app.js');

app({
  numbersTotal: argv.n,
  numberLength: argv.l,
  timeToMemorize: argv.m,
  timeToWait: argv.w,
});
