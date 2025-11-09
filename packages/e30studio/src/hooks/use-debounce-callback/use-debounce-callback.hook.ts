import { useCallback, useEffect, useRef } from 'react'

export const useDebounceCallback = <TResponse>(
  callback: (...args: unknown[]) => TResponse,
  wait = 20
) => {
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return useCallback(
    (...args: unknown[]) => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => callback(...args), wait)
    },
    [callback, wait]
  )
}
