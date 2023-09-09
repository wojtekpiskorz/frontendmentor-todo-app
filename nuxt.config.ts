// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: 'Frontend Mentor | Todo app',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
      ],
    },
  },
})
