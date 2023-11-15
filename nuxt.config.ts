// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'n3vito - объявления',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
        }
      ]
    }
  },
  css: [
    'primevue/resources/themes/saga-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css'
  ],
  modules: ['@formkit/nuxt', '@nuxtjs/supabase', 'nuxt-vitest', 'nuxt-primevue', '@element-plus/nuxt'],
  primevue: {
    usePrimeVue: true,
    components: {
      prefix: 'C',
      include: ['Button', 'FileUpload', 'Image', 'Menu']
    }

  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/global.scss";'
        }
      }
    }
  }
})
