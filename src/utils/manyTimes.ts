export function manyTimes<A>(n: number, f: () => A): Array<A> {
  const results: Array<A> = []
  while (n > 0) {
    n--
    results.push(f())
  }

  return results
}
