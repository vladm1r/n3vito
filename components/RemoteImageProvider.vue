<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

import { Storages } from '@/types'

const props = defineProps<{
  storage: Storages
  imageUrl: string
}>()

const supabase = useSupabaseClient()
const toast = useToast()
const imageSource = ref('')
const isLoading = ref(false)

const downloadImage = async () => {
  try {
    isLoading.value = true

    const result = await supabase.storage.from(props.storage).download(props.imageUrl)
    if (!result.error) {
      imageSource.value = URL.createObjectURL(result.data)
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка загрузки изображения', detail: getErrorMessage(error), life: 3000 })
  } finally {
    isLoading.value = false
  }
}

watch(() => props.imageUrl, () => {
  downloadImage()
})

downloadImage()
</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <slot v-else :src="imageSource" />
</template>
