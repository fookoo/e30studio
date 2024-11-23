import { act } from 'react'

import { renderHook } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { useObject } from './use-object.hook'

const initialData = {
  name: 'John Doe',
  mobile: '+44 432 454 981',
  email: 'john@example.com'
}

describe('useObject hook', () => {
  it('initial value', () => {
    const { result } = renderHook(() => useObject(initialData))

    expect(result.current.state).toStrictEqual(initialData)
  })

  it('update value', () => {
    const { result } = renderHook(() => useObject(initialData))

    act(() => result.current.update({}))

    expect(result.current.state).toStrictEqual(initialData)

    act(() =>
      result.current.update({
        email: 'john@our-domain.com'
      })
    )

    expect(result.current.state).toStrictEqual({
      name: 'John Doe',
      mobile: '+44 432 454 981',
      email: 'john@our-domain.com'
    })
  })

  it('set value', () => {
    const { result } = renderHook(() => useObject(initialData))

    act(() => {
      const setter = result.current.set('email')
      setter('john@our-domain.com')
    })

    expect(result.current.state).toStrictEqual({
      ...initialData,
      email: 'john@our-domain.com'
    })
  })

  it('get value', () => {
    const { result } = renderHook(() => useObject(initialData))
    const value = result.current.get('email')

    expect(value).toBe('john@example.com')
  })
})
