import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const common = {
  exports: 'auto',
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: false
}

export default [
  {
    input: ['src/index.ts', 'src/hooks/index.ts', 'src/components/index.ts', 'src/styled/index.ts'],
    output: [
      {
        dir: 'dist/cjs',
        format: 'cjs',
        ...common
      },
      {
        dir: 'dist/esm',
        format: 'esm',
        ...common
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
