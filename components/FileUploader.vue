<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { UploadInstance, UploadFile, UploadRawFile } from 'element-plus'
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

const uploadRef = ref<UploadInstance>()
const fileError = ref('')
const isLoading = ref(false)

const uploadFile = async (uploadFile: UploadFile) => {
  const file = uploadFile.raw
  if (!fileValidate(file) || !file) { return }

  const filePath = createFileName(file)

  try {
    isLoading.value = true

    const result = await supabase.storage.from(props.storage).upload(filePath, file)

    if (!result.error) {
      const { data } = supabase
        .storage
        .from(props.storage)
        .getPublicUrl(filePath)

      emit('update', data.publicUrl)
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка загрузки файла', message: getErrorMessage(error) })
  } finally {
    isLoading.value = false
    fileError.value = ''
  }
}

const fileValidate = (file:UploadRawFile|undefined) => {
  if (!file || (props.accept && !props.accept.includes(file.type))) {
    fileError.value = `Неправильный тип файла, файл должен быть формата ${props.accept}`
    return false
  }

  if (props.maxFileSize && props.maxFileSize < file.size) {
    fileError.value = `Превышен размер файла, файл должен быть меньше ${props.maxFileSize / 1000}kb`
    return false
  }

  return true
}

const createFileName = (file:UploadRawFile):string => {
  const fileExt = file.name.split('.').pop()
  return `${Math.random()}.${fileExt}`
}
</script>

<template>
  <div class="file-uploader">
    <ElUpload
      ref="uploadRef"
      :accept="props.accept"
      :limit="1"
      @change="uploadFile"
    >
      <ElButton type="primary" :loading="isLoading">
        Загрузить
      </ElButton>

      <template v-if="fileError" #tip>
        <div class="el-upload__tip">
          {{ fileError }}
        </div>
      </template>
    </ElUpload>
  </div>
</template>

<style lang="scss">
.file-uploader {
  max-width: 300px;

  .el-upload__tip {
    color: $color-danger;
  }
}
</style>
