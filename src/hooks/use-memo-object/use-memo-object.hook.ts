import { useMemo, useRef } from 'react'
import deepEqual from 'fast-deep-equal'

export const useMemoObject = <T extends object>(input: T) => {
  const objRef = useRef(input)

  return useMemo(() => {
    if (!deepEqual(input, objRef.current)) {
      objRef.current = input

      return input
    }

    return objRef.current
  }, [input])
}
