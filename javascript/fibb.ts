// 1,1,2,3,5,8

export function nthFibb(n: number) {
  if (n == 0) {
    return 0;
  }

  if (n == 1) {
    return 1;
  }

  let nMinus2 = 0;
  let nMinus1 = 1;
  for (let i = 1; i < n; i++) {
    const newN = nMinus1 + nMinus2;
    nMinus2 = nMinus1;
    nMinus1 = newN;
  }
  return nMinus1;
}
