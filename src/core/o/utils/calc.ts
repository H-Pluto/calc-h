export function roundTo(value: number, decimals = 5): number {
  const factor = 10 ** decimals
  return Math.round(value * factor) / factor
}
