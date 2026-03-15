import { defineConfig, mergeConfig } from 'vite';
import { version } from '../package.json';
import viteConfig from '../vite.config';

export default defineConfig((env) =>
  mergeConfig(viteConfig(env), {
    build: {
      emptyOutDir: false,
      minify: 'terser',
      target: 'esnext',
      terserOptions: {
        format: {
          comments: false,
          ecma: 2022,
          preamble: `// ${version}`,
          wrap_func_args: false,
        },
        keep_fnames: false,
        mangle: {
          properties: false,
          toplevel: true,
        },
      },
    },
  })
);
