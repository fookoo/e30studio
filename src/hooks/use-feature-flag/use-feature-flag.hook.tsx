import { useMemo } from 'react'

type ViteMeta = {
  env: {
    [key: string]: string
  }
}

const getEnv = (name: string) => {
  if (typeof import.meta !== 'undefined' && 'env' in import.meta) {
    const viteEnvs = import.meta as unknown as ViteMeta

    return viteEnvs.env[`VITE_${name.toUpperCase()}`]
  } else if (typeof process !== 'undefined' && process.env) {
    return process.env[`REACT_APP_${name}`]
  } else {
    console.warn(`Environment variable ${name} is not defined`)

    return undefined
  }
}

export const useFeatureFlag = <T extends string>(flags: T[]): boolean[] =>
  useMemo(() => flags.map((flag) => String(getEnv(flag)).toUpperCase() === 'TRUE'), [flags])
