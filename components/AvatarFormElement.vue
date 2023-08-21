<script setup lang="ts">
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const supabase = useSupabaseClient()

const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
  if (!props.modelValue) {
    return
  }

  try {
    const { data, error } = await supabase.storage.from('avatars').download(props.modelValue)
    if (error) { throw error }
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

const uploadAvatar = async (e) => {
  files.value = e.originalEvent.target.files

  try {
    uploading.value = true

    if (!files.value || files.value.length === 0) {
      // throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const filePath = createFileName(file)

    const result = await supabase.storage.from('avatars').upload(filePath, file)

    if (!result.error) {
      emit('update:modelValue', filePath)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

const createFileName = (file):string => {
  const fileExt = file.name.split('.').pop()
  return `${Math.random()}.${fileExt}`
}

downloadImage()

watch(() => props.modelValue, () => {
  if (props.modelValue) {
    downloadImage()
  }
})
</script>

<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image"
      style="width: 10em; height: 10em;"
    >
    <!-- <div v-else class="avatar no-image" :style="{ height: 100, width: 100 }" /> -->

    <div style="width: 10em; position: relative;">
      <label class="button primary block" for="single">
        {{ uploading ? 'Uploading ...' : 'Upload' }}
        <input
          id="single"
          style="position: absolute; visibility: hidden;"
          type="file"
          accept="image/*"
          :disabled="uploading"
          @change="uploadAvatar"
        >
      </label>

      <CFileUpload
        mode="basic"
        accept="image/*"
        :max-file-size="1000000"
        custom-upload
        @select="uploadAvatar"
      />
    </div>
  </div>
</template>

<style lang="scss">

</style>
