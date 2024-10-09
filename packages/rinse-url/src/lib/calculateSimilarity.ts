import { tokenize } from './tokenize';

export function calculateSimilarity(a: string, b: string) {
  const tokensA = tokenize(a);
  const tokensB = tokenize(b);

  const totalTokens = [...tokensA, ...tokensB];

  const tokenSet = getUniqueTokenSet(totalTokens);

  const frequencyMapA = createFrequencyMap(tokensA, tokenSet);
  const frequencyMapB = createFrequencyMap(tokensB, tokenSet);

  return calculateCosineSimilarity(frequencyMapA, frequencyMapB);
}

function getUniqueTokenSet(tokens: string[]) {
  const tokenSet = new Set<string>();
  tokens.forEach((token) => tokenSet.add(token));
  return tokenSet;
}

function createFrequencyMap(tokens: string[], tokenSet: Set<string>) {
  const frequencyMap = new Map<string, number>();
  tokenSet.forEach((token) => {
    const frequency = tokens.filter((t) => t === token).length;
    frequencyMap.set(token, frequency);
  });
  return frequencyMap;
}

function calculateCosineSimilarity(
  frequencyMapA: Map<string, number>,
  frequencyMapB: Map<string, number>
) {
  const dotProduct = calculateDotProduct(frequencyMapA, frequencyMapB);
  const magnitudeA = calculateMagnitude(frequencyMapA);
  const magnitudeB = calculateMagnitude(frequencyMapB);
  return dotProduct / (magnitudeA * magnitudeB);
}
function calculateDotProduct(
  frequencyMapA: Map<string, number>,
  frequencyMapB: Map<string, number>
) {
  let dotProduct = 0;
  frequencyMapA.forEach((frequencyA, token) => {
    const frequencyB = frequencyMapB.get(token) || 0;
    dotProduct += frequencyA * frequencyB;
  });
  return dotProduct;
}

function calculateMagnitude(frequencyMap: Map<string, number>) {
  let magnitude = 0;
  frequencyMap.forEach((frequency) => {
    magnitude += frequency * frequency;
  });
  return Math.sqrt(magnitude);
}
