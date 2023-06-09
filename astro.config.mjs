import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import sitemap from '@astrojs/sitemap'

import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  site: 'https://solid-astro-eight.vercel.app',
  integrations: [tailwind(), solidJs(), sitemap()],
  output: 'server',
  adapter: vercel({
    analytics: true,
  }),
})
