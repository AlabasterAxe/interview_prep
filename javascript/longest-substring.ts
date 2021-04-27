//
// acbbcedda => abced
// a => a
// ac => ac
// aca => ac
// acab => cab
// acabc => cab
// acabce => abce

function lengthOfLongestSubstring(s: string) {
  let letterIndices = new Map<string, number>();
  let startIndex = 0;
  let longest = 0;

  for (let i = 0; i < s.length; i++) {
    if (letterIndices.has(s[i])) {
      startIndex = letterIndices.get(s[i]) + 1;
      for (let [k, v] of letterIndices) {
        if (v < startIndex) {
          letterIndices.delete(k);
        }
      }
    }

    letterIndices.set(s[i], i);
    if (i - startIndex > longest) {
      longest = i - startIndex;
    }
  }
}
