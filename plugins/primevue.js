import PrimeVue from 'primevue/config'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Image from 'primevue/image'
import Menu from 'primevue/menu'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component('CAvatar', Avatar)
  nuxtApp.vueApp.component('CButton', Button)
  nuxtApp.vueApp.component('CImage', Image)
  nuxtApp.vueApp.component('CMenu', Menu)
  // other components that you need
})
