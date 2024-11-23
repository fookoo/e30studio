import React from 'react'

import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { SplitView } from './split-view.component'

describe('SplitView component', () => {
  it('renders without errors', () => {
    const { container } = render(
      <SplitView>
        <div>Left Column</div>
        <div>Right Column</div>
      </SplitView>
    )

    expect(container).toBeDefined()
  })
})
