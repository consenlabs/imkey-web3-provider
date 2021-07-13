import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import json from '@rollup/plugin-json'

// export default {
//   input: 'src/index.ts',
//   output: {
//     dir: 'output',
//     format: 'cjs'
//   },
//   plugins: [typescript()]
// };

const external = (id) =>
  /^react|react-dom|underscore-umd|underscore|next\/link/.test(id)

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'imkey-web3-provider',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      json(),
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      typescript(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    plugins: [
      typescript({ declaration: true, outDir: 'dist' }),
      commonjs(), // so Rollup can convert `ms` to an ES module
       json()
      ],
    output: [
      { file: pkg.main, format: 'cjs' },
    ],
  },
  {
    input: 'src/index.ts',
    plugins: [
      typescript({ declaration: true, outDir: 'dist' }),
      commonjs({ esmExternals: external }), // so Rollup can convert `ms` to an ES module
       json()
      ],
    output: [
      { file: pkg.module, format: 'es' },
    ],
  }
]
