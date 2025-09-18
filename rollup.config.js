import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const banner = `/*!
 * Bootstrap Italia WC v1.0.0
 * Bootstrap Italia components as native Web Components
 * (c) 2024 Bootstrap Italia WC Contributors
 * Released under the MIT License.
 */`;

export default [
  // UMD build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bootstrap-italia-wc.js',
      format: 'umd',
      name: 'BootstrapItaliaWC',
      banner
    },
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [['@babel/preset-env', { targets: { browsers: ['> 1%', 'last 2 versions'] } }]]
      })
    ]
  },
  // UMD minified build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bootstrap-italia-wc.min.js',
      format: 'umd',
      name: 'BootstrapItaliaWC',
      banner
    },
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [['@babel/preset-env', { targets: { browsers: ['> 1%', 'last 2 versions'] } }]]
      }),
      terser()
    ]
  },
  // ES module build
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bootstrap-italia-wc.esm.js',
      format: 'es',
      banner
    },
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [['@babel/preset-env', { targets: { browsers: ['> 1%', 'last 2 versions'] } }]]
      })
    ]
  }
];