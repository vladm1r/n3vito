<script setup lang="ts">
import { Storages } from '@/types'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [modelValue: string]
}>()

const onImageUpload = (imagePath:string) => {
  emit('update:modelValue', imagePath)
}
</script>

<template>
  <div class="upload-image">
    <label class="upload-image__label">
      Выберите изображение для объявления
    </label>

    <RemoteImageProvider v-slot="image" :image-url="modelValue" :storage="Storages.IMAGES">
      <img
        :src="image.src"
        alt="Post image"
        class="upload-image__image"
      >
    </RemoteImageProvider>

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
