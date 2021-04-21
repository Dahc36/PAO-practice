const getRandomNumber = require('./getRandomNumber');

test('number to be within the specified range', () => {
  const set = new Set();
  const testCases = 16;
  const repetitions = 1000;

  for (let i = 1; i < 1 + testCases; i++) {
    const testCaseSet = new Set();
    let lessThanMin = 0;
    for (let j = 0; j < repetitions; j++) {
      const number = getRandomNumber(i);
      set.add(number);
      testCaseSet.add(number);
      if (lessThanMin < Math.pow(10, i - 1)) {
        lessThanMin++;
      }

      expect(number).toBeDefined();
      expect(number).not.toBeNull();
      expect(typeof number).toBe('number');
      expect(number).toBeGreaterThan(0);
      expect(number).toBeLessThan(Math.pow(10, i));
      if (i > 1) {
        expect(lessThanMin).toBeGreaterThan(0);
      }
    }

    expect(testCaseSet.size).toBeLessThan(repetitions);
  }
});
