function getBenfordsDigit() {
  const seed = Math.random();

  for (let i = 1; i < 10; i++) {
    if (seed < Math.log10(i + 1)) {
      return i;
    }
  }
}

module.exports = getBenfordsDigit;
