import { defineConfig } from 'vite';
/** @type {import('vite').UserConfig} */
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
