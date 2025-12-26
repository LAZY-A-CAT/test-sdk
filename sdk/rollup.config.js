// sdk/rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss'; // ✅ 正确导入
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  input: 'sdk/entry.tsx',
  output: {
    file: 'dist/my-sdk.umd.js',
    format: 'umd',
    name: 'MySDK',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  plugins: [
    alias({
      entries: [{ find: '@', replacement: resolve(__dirname, '../src') }]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.sdk.json',
      jsx: 'react',
    }),
    postcss({
      extensions: ['.css', '.scss'],
      extract: false,   // 内联 CSS 到 JS
      minimize: true,
      use: ['sass'],    // 使用 sass 编译 .scss
    }),
  ],
  external: [],
};