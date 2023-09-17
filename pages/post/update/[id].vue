<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { createdPost } from 'types'

const supabase = useSupabaseClient()
const toast = useToast()
const route = useRoute()

const post:createdPost = reactive({
  title: '',
  price: 0,
  image_url: '',
  description: ''
})

const isLoading = ref(false)

const getPost = async () => {
  try {
    isLoading.value = true

    const result = await supabase
      .from('posts')
      .select().eq('id', route.params.id)

    if (!result.error) {
      const data = result.data[0]
      post.title = data.title
      post.price = data.price
      post.image_url = data.image_url
      post.description = data.description
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка при получении данных', detail: getErrorMessage(error), life: 3000 })
  } finally {
    isLoading.value = false
  }
}

const updatePost = async () => {
  try {
    const result = await supabase
      .from('posts')
      .update(post)
      .eq('id', route.params.id)

    if (!result.error) {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Объявление обновлено', life: 3000 })
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка при обновлении', detail: getErrorMessage(error), life: 3000 })
  }
}

getPost()

</script>

<template>
  <LoadSpinner v-if="isLoading" />

  <FormKit
    v-else
    type="form"
    submit-label="обновить"
    @submit="updatePost"
  >
    <FormKit
      v-model="post.title"
      type="text"
      label="Название"
    />

    <ImageFormElement v-model="post.image_url" />

    <FormKit
      v-model="post.description"
      type="textarea"
      label="Описание"
    />

    <FormKit
      v-model="post.price"
      type="number"
      label="Цена"
    />
  </FormKit>
</template>
