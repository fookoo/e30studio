/// Copyright 2023 Hitachi Energy. All rights reserved.

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['**/*.style.{ts,tsx}', '**/*.const.{ts,tsx}', '**/*.type.ts']
    },
    fileParallelism: true
  }
})
