export function testFunction(foo: number) {
  foo++;
  console.log(foo);
}

let bar = 5;

testFunction(bar);

console.log(bar);
