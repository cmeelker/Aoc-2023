export function sum(numbers: number[]): number {
  return numbers.reduce((x, y) => {
    return (x || 0) + (y || 0);
  });
}
