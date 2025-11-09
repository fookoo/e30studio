import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import packageJson from './package.json' assert { type: 'json' }

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        components: resolve(__dirname, 'src/components/index.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        services: resolve(__dirname, 'src/services/index.ts'),
        styled: resolve(__dirname, 'src/styled/index.ts')
      },
      name: 'e30Studio',
      formats: ['es']
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js'
      }
    }
  }
})
