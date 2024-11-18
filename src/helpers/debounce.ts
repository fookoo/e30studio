export const debounce = function debounce<T extends Function>(cb: T, wait = 20) {
  let h: NodeJS.Timeout

  return (...args: unknown[]) => {
    clearTimeout(h)
    h = setTimeout(() => cb(...args), wait)
  }
}
