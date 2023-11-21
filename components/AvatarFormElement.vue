<script setup lang="ts">
import { Storages } from '../types'

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [modelValue: string]
}>()

const onAvatarUpload = (avatarPath:string) => {
  emit('update:modelValue', avatarPath)
}
</script>

<template>
  <div class="upload-avatar">
    <label class="upload-avatar__label">
      Выберите изображение для аватара
    </label>

    <RemoteImageProvider v-slot="image" :image-url="modelValue" :storage="Storages.AVATARS">
      <img
        :src="image.src"
        alt="Avatar"
        class="upload-avatar__image"
      >
    </RemoteImageProvider>

    <FileUploader :storage="Storages.AVATARS" accept="image/png, image/jpeg" @update="onAvatarUpload" />
  </div>
</template>

<style lang="scss">
.upload-avatar {
  margin-bottom: 12px;

  &__label {
    display: block;
    font-size: $font-size-main;
    font-weight: 500;
    margin-bottom: 8px;
  }

  &__image {
    width: 100px;
    margin-bottom: 8px;
  }
}
</style>
