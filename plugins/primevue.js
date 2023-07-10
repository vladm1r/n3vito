import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Image from 'primevue/image'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('Image', Image)
  // other components that you need
})
