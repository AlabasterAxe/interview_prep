// pick a pivot
// start from either end and move inward until you find one that's greater than the pivot on the left side and less than the pivot on the right side
// if the one on the left side is greater than the one on the right side swap them
// do this recursively

export function quicksort(arr: number[], startIdx: number, endIdx: number) {
  if (startIdx >= endIdx) {
    return arr;
  }

  let pivotIdx = Math.round(startIdx + (endIdx - startIdx) / 2);
  let newStartIdx = startIdx;
  let newEndIdx = endIdx;
  while (newStartIdx < newEndIdx) {
    while (arr[newStartIdx] < arr[pivotIdx] && newStartIdx < newEndIdx) {
      newStartIdx++;
    }

    while (arr[newEndIdx] > arr[pivotIdx] && newEndIdx > newStartIdx) {
      newEndIdx--;
    }

    if (arr[newStartIdx] > arr[newEndIdx]) {
      const tmp = arr[newStartIdx];
      arr[newStartIdx] = arr[newEndIdx];
      arr[newEndIdx] = tmp;
    }

    if (newStartIdx < newEndIdx) {
      newStartIdx++;
    }
    if (newEndIdx > newStartIdx) {
      newEndIdx--;
    }
  }

  quicksort(arr, startIdx, Math.min(newStartIdx, endIdx - 1));
  quicksort(arr, Math.min(newStartIdx + 1, endIdx), endIdx);
  return arr;
}

let arrayToSort = [3, 2, 1];

console.log(quicksort(arrayToSort, 0, arrayToSort.length - 1));
