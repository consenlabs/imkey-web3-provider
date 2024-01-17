import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import json from '@rollup/plugin-json'
import nodePolyfills from 'rollup-plugin-polyfill-node';

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
      name: "imKeyWeb3Provider",
      file: 'dist/imkey-web3-provider.js',
      format: 'es',
    },
    plugins: [
      json(),
      nodeResolve({preferBuiltins: false, browser: true}),
      commonjs(),
      typescript(),
      nodePolyfills(),
    ],
  },

]
