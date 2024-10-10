import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  site: 'https://covault.co',
  output: 'hybrid',
  adapter: node({
    mode: "standalone"
  }),
  integrations: [sitemap(), tailwind(), react()]
});