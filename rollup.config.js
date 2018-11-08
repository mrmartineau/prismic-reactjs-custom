import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import jsx from 'rollup-plugin-jsx'
import autoExternal from 'rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import bundleSize from 'rollup-plugin-bundle-size'

import pkg from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      buble(),
      resolve(),
      commonjs(),
      jsx({ factory: 'React.createElement' }),
      autoExternal(),
      buble(),
      terser(),
      bundleSize(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      buble(),
      resolve(),
      commonjs(),
      jsx({ factory: 'React.createElement' }),
      autoExternal(),
      buble(),
      terser(),
      bundleSize(),
    ],
  },
]
