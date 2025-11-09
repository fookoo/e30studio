import { useCallback, useState } from 'react'

export const useObject = <T extends object>(initial: T = {} as T) => {
  const [state, setState] = useState<T>(initial)

  const handleUpdate = useCallback((change: Partial<T>) => {
    setState((prev) => ({ ...prev, ...change }))
  }, [])

  const setFactory = useCallback(
    <Key extends keyof T>(key: Key) =>
      (value: T[Key]) => {
        setState((prev) => ({ ...prev, [key]: value }))
      },
    []
  )

  const handleGet = useCallback(<Key extends keyof T>(key: Key) => state[key], [state])

  return {
    state,
    get: handleGet,
    set: setFactory,
    update: handleUpdate
  }
}
