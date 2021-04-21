const getRandomNumberList = require('./getRandomNumberList');

const testCases = [];

for (let i = 1; i < 16; i++) {
  for (let j = 1; j < 16; j++) {
    testCases.push({
      numberTotal: i,
      numberLength: j,
      list: getRandomNumberList(i, j),
    });
  }
}

test('list to be of the right length', () => {
  for (const testCase of testCases) {
    expect(testCase.list).toHaveLength(testCase.numberTotal);
  }
});

test('list to contain numbers bewteen number length', () => {
  for (const testCase of testCases) {
    for (const number of testCase.list) {
      expect(typeof number).toBe('number');
      expect(number).not.toBeNaN();
      expect(number).toBeGreaterThan(0);
      expect(number).toBeLessThan(Math.pow(10, testCase.numberLength));
    }
  }
});
