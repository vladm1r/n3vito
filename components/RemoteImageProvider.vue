<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

import { Storages } from '../types'

const props = defineProps<{
  storage: Storages
  imageUrl: string
}>()

const supabase = useSupabaseClient()
const toast = useToast()
const imageSource = ref('')

const downloadImage = async () => {
  try {
    const result = await supabase.storage.from(props.storage).download(props.imageUrl)
    if (!result.error) {
      imageSource.value = URL.createObjectURL(result.data)
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка загрузки изображения', detail: getErrorMessage(error), life: 3000 })
  }
}

watch(() => props.imageUrl, () => {
  downloadImage()
})

</script>

<template>
  <slot :src="imageSource" />
</template>
