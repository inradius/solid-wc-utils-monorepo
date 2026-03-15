import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { ConfigEnv, defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const viteConfig = ({ mode }: ConfigEnv) =>
  defineConfig({
    build: {
      emptyOutDir: false,
      rollupOptions: {
        output: {
          assetFileNames: '[name][extname]',
          chunkFileNames: '[name]-[hash].js',
          entryFileNames: '[name]-[hash].js',
        },
      },
      target: 'esnext',
    },
    plugins: [
      solidPlugin({ dev: mode === 'development', hot: mode !== 'test' }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@app': resolve(__dirname, 'src'),
        '@dist': resolve(__dirname, 'dist'),
      },
      conditions: ['browser', 'development'],
    },
    server: { port: 3000 },
  });

export default viteConfig;
