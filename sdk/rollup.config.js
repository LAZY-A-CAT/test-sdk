// sdk/rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; // ←←← 新增
import alias from '@rollup/plugin-alias';
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
    nodeResolve({ browser: true }), // 先解析 node_modules
    commonjs(), // ←←← 必须放在 nodeResolve 之后，处理 CJS 模块
    typescript({
      tsconfig: './tsconfig.sdk.json',
      jsx: 'react',
    }),
  ],
  external: [], // 打包 React 进去（UMD）
};