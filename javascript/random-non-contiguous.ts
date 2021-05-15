export function randomNonContiguous(domain: number, numberOfNumbers): number[] {
  Math.random();
  const nextPossibleValues = [];
  for (let i = 1; i <= domain; i++) {
    const nextPossibleValuesAfterI = [];
    for (let j = 1; j <= domain; j++) {
      if (j !== i) {
        nextPossibleValuesAfterI.push(j);
      }
    }
    nextPossibleValues[i] = nextPossibleValuesAfterI;
  }

  const result = [];
  let lastNumber = Math.floor(Math.random() * domain) + 1;
  for (let i = 0; i < numberOfNumbers; i++) {
    const options = nextPossibleValues[lastNumber];
    lastNumber = options[Math.floor(Math.random() * options.length)];
    result.push(lastNumber);
  }
  return result;
}

console.log(randomNonContiguous(6, 100));
