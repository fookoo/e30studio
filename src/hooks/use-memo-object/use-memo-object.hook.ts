import { useEffect, useRef } from 'react'
import deepEqual from 'fast-deep-equal'

export const useMemoObject = <T extends object>(input?: T) => {
  const objRef = useRef(input)

  useEffect(() => {
    if (!deepEqual(input, objRef.current)) {
      objRef.current = input
    }
  }, [input])

  return objRef.current
}
