<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { newPost } from '../../types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()

const post:newPost = reactive({
  title: '',
  price: 0,
  image_url: '',
  description: '',
  user_id: user.value.id
})

const createPost = async () => {
  try {
    const result = await supabase
      .from('posts')
      .insert(post)

    if (!result.error) {
      toast.add({ severity: 'success', summary: 'Успех', detail: 'Объявление создано', life: 3000 })
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка при создании', detail: getErrorMessage(error), life: 3000 })
  }
}

</script>

<template>
  <FormKit
    type="form"
    submit-label="Создать"
    @submit="createPost"
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

<style lang="scss">

</style>
