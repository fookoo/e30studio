import React, { useState } from 'react'
import { takeValueFromEvent } from './events'
import { describe, it, expect, beforeEach } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'

const TestComponent = () => {
  const [value, setValue] = useState('')

  return (
    <div>
      <pre data-testid="value">{value}</pre>
      <input onChange={takeValueFromEvent(setValue)} />
    </div>
  )
}

describe('takeValueFromEvent', () => {
  beforeEach(cleanup)

  it('should render input and pre elements', () => {
    const { getByTestId } = render(<TestComponent />)

    expect(getByTestId('value').textContent).toBe('')
  })

  it('should update pre element text on input change', () => {
    const { getByTestId, getByRole } = render(<TestComponent />)
    const inputElement = getByRole('textbox')

    expect(getByTestId('value').textContent).toBe('')

    fireEvent.change(inputElement, { target: { value: 'new value' } })

    expect(getByTestId('value').textContent).toBe('new value')
  })
})
