/**
 * Given a string, determine if all characters in the string are repeated the same number of times.
 * Return true if they are, and false if they aren't.
 * O(n) tune complexity
 */

const repeatedChars = (str: string): boolean => {
  if (str.length === 0) return true;

  const charCount = new Map<string, number>();

  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  const firstCount = charCount.values().next().value;

  for (const count of charCount.values()) {
    if (count !== firstCount) return false;
  }

  return true;
};

console.log(repeatedChars("xxyyy")); // false
console.log(repeatedChars("xxyy")); // true
console.log(repeatedChars("abcdefg")); // true
