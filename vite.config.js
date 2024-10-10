import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `
        // @import "./src/styles/_base.scss";
        // @import "./src/styles/_variables.scss";
        // `,
        api: 'modern-compiler',
      },
    },
  },
});
