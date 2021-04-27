for (let i = 1; i <= 100; i++) {
  let altResult = `${i % 3 == 0 ? "Fizz" : ""}${i % 5 == 0 ? "Buzz" : ""}`;
  if (altResult) {
    console.log(altResult);
  } else {
    console.log(i);
  }
}
