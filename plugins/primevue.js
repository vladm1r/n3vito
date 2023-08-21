import PrimeVue from 'primevue/config'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import Image from 'primevue/image'
import Menu from 'primevue/menu'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.use(ToastService)
  nuxtApp.vueApp.component('CAvatar', Avatar)
  nuxtApp.vueApp.component('CButton', Button)
  nuxtApp.vueApp.component('CFileUpload', FileUpload)
  nuxtApp.vueApp.component('CImage', Image)
  nuxtApp.vueApp.component('CMenu', Menu)
  nuxtApp.vueApp.component('CToast', Toast)
  // other components that you need
})
