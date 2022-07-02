import { useMemo } from 'react'

export const useFeatureFlag = <T extends string>(flags: T[]): boolean[] =>
  useMemo(
    () =>
      flags
        .map((flag) => `REACT_APP_${flag.toUpperCase()}`)
        .map((flag) => (process.env[flag] || '').toLowerCase() === 'true'),
    [flags]
  )
