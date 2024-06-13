import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

import tsConfigPaths from 'vite-tsconfig-paths'
import packageJson from './package.json' with { type: 'json' }

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),``
    dts({
      include: ['src/'],
      outDir: 'dist'
    }),
  ],
  build: {
    lib: {
      entry: [
        'src/index.ts',
        'src/hooks/index.ts',
        'src/components/index.ts',
        'src/services/index.ts',
        'src/styled/index.ts'
      ]
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        dir: 'dist',
        format: 'esm',
        exports: 'named',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: false
      }
    },
  },
}))
