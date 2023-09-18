<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { FileUploadSelectEvent } from '../node_modules/primevue/fileupload'
import { Storages } from '@/types'

interface Props {
  accept?: string
  maxFileSize?: number
  storage: Storages
}

const props = withDefaults(defineProps<Props>(), {
  accept: '',
  maxFileSize: 100000
})

const emit = defineEmits<{
  update: [filePath: string]
}>()

const supabase = useSupabaseClient()
const toast = useToast()

const isLoading = ref(false)

const uploadFile = async (event:FileUploadSelectEvent) => {
  const file = (event.files as FileList)[0]
  if (!file) {
    return
  }

  const filePath = createFileName(file)

  try {
    isLoading.value = true

    const result = await supabase.storage.from(props.storage).upload(filePath, file)

    if (!result.error) {
      emit('update', filePath)
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка загрузки файла', detail: getErrorMessage(error), life: 3000 })
  } finally {
    isLoading.value = false
  }
}

const createFileName = (file:File):string => {
  const fileExt = file.name.split('.').pop()
  return `${Math.random()}.${fileExt}`
}
</script>

<template>
  <LoadSpinner v-if="isLoading" />

  <CFileUpload
    v-show="!isLoading"
    mode="basic"
    :accept="props.accept"
    :max-file-size="props.maxFileSize"
    custom-upload
    @select="uploadFile"
  />
</template>
