<script setup lang="ts">
import { ElNotification } from 'element-plus'

import { Storages } from '@/types'

const props = defineProps<{
  storage: Storages
  imageUrl: string
}>()

const supabase = useSupabaseClient()

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
    ElNotification({ type: 'error', title: 'Ошибка загрузки изображения', message: getErrorMessage(error) })
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
