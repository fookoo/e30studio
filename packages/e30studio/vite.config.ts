import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import packageJson from './package.json' with { type: 'json' }

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'emotion-cjs-fix',
      enforce: 'post',
      generateBundle(_, bundle) {
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (fileName.endsWith('.cjs.js') && typeof chunk.code === 'string') {
            chunk.code = chunk.code.replace(
              /require\(['"]@emotion\/styled['"]\)/g,
              '(require("@emotion/styled").default || require("@emotion/styled"))'
            )
          }
        }
      }
    }
  ],
  build: {
    lib: {
      entry: {
        components: resolve(__dirname, 'src/components/index.ts'),
        hooks: resolve(__dirname, 'src/hooks/index.ts'),
        services: resolve(__dirname, 'src/services/index.ts'),
        helpers: resolve(__dirname, 'src/helpers/index.ts'),
        styled: resolve(__dirname, 'src/styled/index.ts')
      },
      name: 'e30Studio',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime'],
      output: {
        exports: 'auto',
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].[format].js'
      }
    },
    commonjsOptions: {
      defaultIsModuleExports: true
    }
  }
})
