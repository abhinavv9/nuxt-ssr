// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Core settings
  ssr: true,
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",

  // Modules - using array syntax for module options
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // App configuration
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "My Blog",
      meta: [
        { name: "description", content: "My amazing blog built with Nuxt 3" },
      ],
    },
  },

  // Build optimization
  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    payloadExtraction: true,
  },

  // Development
  debug: process.env.NODE_ENV === "development",
});
