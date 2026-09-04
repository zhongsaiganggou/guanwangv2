import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zhongsai-steelstructure.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
