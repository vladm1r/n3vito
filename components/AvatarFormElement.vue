<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { Storages } from '../types'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const supabase = useSupabaseClient()
const toast = useToast()

const imageSource = ref('')

const onAvatarUpload = (avatarPath:string) => {
  emit('update:modelValue', avatarPath)
}

const downloadImage = async () => {
  try {
    const result = await supabase.storage.from(Storages.AVATARS).download(props.modelValue)
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
  <div class="upload-avatar">
    <label class="upload-avatar__label">
      Выберите изображение для аватара
    </label>

    <img
      v-if="imageSource"
      :src="imageSource"
      alt="Avatar"
      class="upload-avatar__image"
    >

    <FileUploader :storage="Storages.AVATARS" @update:file-path="onAvatarUpload" />
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
