const getRandomDigit = require('./getRandomDigit');

const digitDistribution = {
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
const digits = [];

for (let i = 0; i < 100000; i++) {
  const randomDigit = getRandomDigit();
  digits.push(randomDigit);
  digitDistribution[randomDigit]++;
}

function getDigitDistribution(digit) {
  return digitDistribution[digit] / digits.length;
}

test('digit should be a number within 1 and 9', () => {
  for (const digit of digits) {
    expect(digit).toBeDefined();
    expect(digit).not.toBeNull();
    expect(typeof digit).toBe('number');
    expect(digit).toBeGreaterThan(0);
    expect(digit).toBeLessThan(10);
  }
});

test(`digit distribution should follow expected distribution`, () => {
  for (let i = 1; i < 10; i++) {
    const distribution = getDigitDistribution(i);
    const expectedDistribution = 1 / 9;
    expect(distribution).toBeCloseTo(expectedDistribution);
    expect(distribution).toBeCloseTo(expectedDistribution);
  }
});
