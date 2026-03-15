import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    minify: 'esbuild',
    rollupOptions: {
      external: ['component-register'],
    },
    sourcemap: false,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: resolve(__dirname, 'tsconfig', 'tsconfig.app.json'),
    }),
  ],
});
