// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://meldashti.github.io',
  base: '/Neural-Portfolio',
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssCodeSplit: true,
    }
  }
});
