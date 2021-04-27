export function leftRotation(a: number[], numRotations: number): number[] {
  // test cases:
  //   empty list => return empty list
  //   negative numRotations => ? right rotations??!?
  //   numRotations == a.length => return a
  //   numRotations > a.length / 2 => a.length - numRotations right rotations

  if (!a || numRotations === null || numRotations === undefined) {
    throw "Invalid Parameters";
  }

  if (
    a.length <= 1 ||
    a.length === numRotations ||
    numRotations % a.length === 0
  ) {
    return a;
  }

  const result = [];
  for (let i = 0; i < a.length; i++) {
    result[(i + numRotations) % a.length] = a[i];
  }

  return result;
}
