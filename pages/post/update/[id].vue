<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { createdPost } from '@/types'

const supabase = useSupabaseClient()

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
    ElNotification({ type: 'error', title: 'Ошибка при получении данных', message: getErrorMessage(error) })
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
      ElNotification({ type: 'success', title: 'Успех', message: 'Объявление обновлено' })
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка при обновлении', message: getErrorMessage(error) })
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
