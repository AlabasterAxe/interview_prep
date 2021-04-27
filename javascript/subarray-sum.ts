function subarraySum_v1(nums: number[], k: number): number {
  const candidateSubarrays = [];
  let result = 0;
  for (const curNum of nums) {
    candidateSubarrays.push([]);
    let i = 0;
    while (i < candidateSubarrays.length) {
      const candidateSubarray = candidateSubarrays[i];
      const sum = candidateSubarray.reduce((curr, acc) => curr + acc, 0);
      const newSubarraySum = sum + curNum;
      if (newSubarraySum < k) {
        candidateSubarray.push(curNum);
        i++;
      } else if (newSubarraySum === k) {
        result++;
        candidateSubarrays.splice(
          candidateSubarrays.indexOf(candidateSubarray),
          1
        );
      } else {
        candidateSubarrays.splice(
          candidateSubarrays.indexOf(candidateSubarray),
          1
        );
      }
    }
  }
  return result;
}

function subarraySum_v2(nums: number[], k: number): number {
  const subSums: number[] = [];
  for (const curNum of nums) {
    subSums.push(0);
    for (let i = 0; i < subSums.length; i++) {
      const subSum = subSums[i];
      if (subSum < k) {
        subSums[i] = subSum + curNum;
      }
    }
  }
  return subSums.reduce((acc, curr) => (curr === k ? acc + 1 : acc), 0);
}

function subarraySum_v3(nums: number[], k: number): number {
  const candidateSubarrays = [];
  let result = 0;
  for (const curNum of nums) {
    candidateSubarrays.push([]);
    for (const candidateSubarray of candidateSubarrays) {
      candidateSubarray.push(curNum);
      const sum = candidateSubarray.reduce((curr, acc) => curr + acc, 0);
      if (sum === k) {
        result++;
      }
    }
  }
  return result;
}

function subarraySum_v4(nums: number[], k: number): number {
  const sums = [];
  let result = 0;
  for (const curNum of nums) {
    sums.push(0);
    for (let i = 0; i < sums.length; i++) {
      sums[i] += curNum;
      if (sums[i] === k) {
        result++;
      }
    }
  }
  return result;
}

console.log(subarraySum_v3([1, 1, 1], 2));
console.log(subarraySum_v3([1], 0));
console.log(subarraySum_v3([1, -1, 1, -1], 0));
