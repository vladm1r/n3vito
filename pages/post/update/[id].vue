<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { createdPost } from '@/types'

const supabase = useSupabaseClient()

const route = useRoute()

const post:Ref<createdPost | undefined> = ref()

const isLoading = ref(false)

const getPost = async () => {
  try {
    isLoading.value = true

    const result = await supabase
      .from('posts')
      .select().eq('id', route.params.id)

    if (!result.error) {
      post.value = result.data[0]
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
      .update(post.value)
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
  <ElSkeleton v-if="isLoading" :rows="5" animated />

  <FormKit
    v-else-if="post"
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
