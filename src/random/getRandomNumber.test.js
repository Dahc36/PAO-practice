const getRandomNumber = require('./getRandomNumber');

test('null is returned for wrong inputs', () => {
  expect(getRandomNumber(0)).toBeNull();
  expect(getRandomNumber(-1)).toBeNull();
});

const testCases = [];
const firstDigitDistribution = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};
const secondDigitDistribution = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
};

for (let i = 1; i < 17; i++) {
  const results = [];
  for (let j = 0; j < 1000; j++) {
    const number = getRandomNumber(i);
    results.push(number);
    firstDigitDistribution[(number + '')[0]]++;
    if (i > 1) {
      secondDigitDistribution[(number + '')[1]]++;
    }
  }
  testCases.push({
    numberLength: i,
    results,
  });
}

test('number to be within the specified range', () => {
  for (const testCase of testCases) {
    let numbersWithAllDigits = 0;
    for (const number of testCase.results) {
      expect(number).toBeDefined();
      expect(number).not.toBeNull();
      expect(typeof number).toBe('number');
      expect(number).toBeGreaterThan(0);
      expect(number).toBeLessThan(Math.pow(10, testCase.numberLength));

      if ((number + '').length === testCase.numberLength) {
        numbersWithAllDigits++;
      }
    }

    expect(numbersWithAllDigits / testCase.results.length).toBeCloseTo(
      1 / testCase.numberLength,
      1
    );
  }
});

test(`first digit distribution should follow Benford's law`, () => {
  for (let i = 1; i < 10; i++) {
    const distribution =
      firstDigitDistribution[i] /
      (testCases.length * testCases[0].results.length);
    const expectedDistribution = Math.log10(1 + 1 / i);
    expect(distribution).toBeCloseTo(expectedDistribution, 1);
  }
});

test(`second digit distribution should follow linear distribution`, () => {
  for (let i = 1; i < 10; i++) {
    const distribution =
      secondDigitDistribution[i] /
      ((testCases.length - 1) * testCases[0].results.length);
    const expectedDistribution = 1 / 9;
    expect(distribution).toBeCloseTo(expectedDistribution, 1);
  }
});
