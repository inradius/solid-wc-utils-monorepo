import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['component-register'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
});
