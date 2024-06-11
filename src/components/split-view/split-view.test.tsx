/// Copyright 2023 Hitachi Energy. All rights reserved.

import React from 'react'

import { ThemeProvider, createTheme } from '@mui/material'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { SplitView } from './split-view.component'

const defaultTheme = createTheme()

describe('SplitView component', () => {
  it('renders without errors', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <SplitView>
          <div>Left Column</div>
          <div>Right Column</div>
        </SplitView>
      </ThemeProvider>
    )

    expect(container).toBeDefined()
  })
})
