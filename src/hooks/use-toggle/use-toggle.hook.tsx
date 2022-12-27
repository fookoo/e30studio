import { useCallback, useMemo, useState } from 'react'

interface UseToggleResponse {
  v: boolean
  value: boolean
  t: () => void
  toggle: () => void
  on: () => void
  off: () => void
  open: () => void
  close: () => void
}

export const useToggle = (initialValue = false): UseToggleResponse => {
  const [value, setValue] = useState(initialValue)
  const open = useCallback(() => setValue(true), [])
  const close = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((p) => !p), [])

  const hook = useMemo(
    () => ({
      v: value,
      value,
      t: toggle,
      toggle,
      open,
      close,
      on: open,
      off: close
    }),
    [value, open, close, toggle]
  )

  return hook
}
