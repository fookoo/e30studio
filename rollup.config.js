import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default [
  {
    external: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      'react',
      'react-dom',
      'rxjs',
      'uuid',
      'tslib'
    ],
    input: ['src/index.ts', 'src/hooks/index.ts', 'src/components/index.ts', 'src/styled/index.ts'],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'auto',
        preserveModules: true,
        preserveModulesRoot: 'src',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser()
    ]
  }
]
