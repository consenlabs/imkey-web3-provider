import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-polyfill-node'

// export default {
//   input: 'src/index.ts',
//   output: {
//     dir: 'output',
//     format: 'cjs'
//   },
//   plugins: [typescript()]
// };

const external = id => /^react|react-dom|underscore-umd|underscore|next\/link/.test(id)

export default [
  // browser-friendly UMD build
  // {
  //   input: 'src/index.ts',
  //   output: {
  //     name: 'imkey-web3-provider',
  //     file: pkg.browser,
  //     format: 'umd',
  //   },
  //   plugins: [
  //     json(),
  //     // resolve(), // so Rollup can find `ms`
  //     // commonjs(), // so Rollup can csonvert `ms` to an ES module
  //     // typescript(),
  //     nodeResolve({ preferBuiltins: false, browser: true }),
  //     commonjs(),
  //     typescript(),
  //     nodePolyfills(),
  //   ],
  // },

  // // CommonJS (for Node) and ES module (for bundlers) build.
  // // (We could have three entries in the configuration array
  // // instead of two, but it's quicker to generate multiple
  // // builds from a single configuration where possible, using
  // // an array for the `output` option, where we can specify
  // // `file` and `format` for each target)
  // {
  //   input: 'src/index.ts',
  //   plugins: [
  //     typescript({ declaration: true, outDir: 'dist' }),
  //     commonjs(), // so Rollup can convert `ms` to an ES module
  //     json(),
  //     nodeResolve({ preferBuiltins: false, browser: true }),
  //     nodePolyfills(),
  //   ],
  //   output: [{ file: pkg.main, format: 'cjs' }],
  // },
  {
    input: 'src/index.ts',
    plugins: [
      json(),
      nodeResolve({ preferBuiltins: false, browser: true }),
      commonjs(),
      typescript(),
      nodePolyfills(),
    ],
    output: [{ file: pkg.module, format: 'es' }],
  },
]
