/**
 * It tokenizes the input string into words.
 * Reference: https://stackoverflow.com/a/150078/9320340
 * @param input - The input string.
 * @returns An array of words.
 */
export function tokenize(input: string): string[] {
  const matched = input.match(/[\w\u00BF-\u1FFF\u2C00-\uD7FF]+/g);
  return matched || [];
}
