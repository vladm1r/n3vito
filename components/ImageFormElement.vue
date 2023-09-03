<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { Storages } from '../types'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [modelValue: string]
}>()

const supabase = useSupabaseClient()
const toast = useToast()

const imageSource = ref('')

const onImageUpload = (imagePath:string) => {
  emit('update:modelValue', imagePath)
}

const downloadImage = async () => {
  try {
    const result = await supabase.storage.from(Storages.IMAGES).download(props.modelValue)
    if (!result.error) {
      imageSource.value = URL.createObjectURL(result.data)
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка загрузки изображения', detail: getErrorMessage(error), life: 3000 })
  }
}

watch(() => props.modelValue, () => {
  if (props.modelValue) {
    downloadImage()
  }
})

onMounted(() => {
  if (props.modelValue) {
    downloadImage()
  }
})
</script>

<template>
  <div class="upload-image">
    <label class="upload-image__label">
      Выберите изображение для объявления
    </label>

    <img
      v-if="imageSource"
      :src="imageSource"
      alt="Post image"
      class="upload-image__image"
    >

    <FileUploader :storage="Storages.IMAGES" @update="onImageUpload" />
  </div>
</template>

<style lang="scss">
.upload-image {
  margin-bottom: 12px;

  &__label {
    display: block;
    font-size: $font-size-main;
    font-weight: 500;
    margin-bottom: 8px;
  }

  &__image {
    width: 300px;
    margin-bottom: 8px;
  }
}
</style>
