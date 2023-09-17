<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { createdPost, Profile } from 'types'

const supabase = useSupabaseClient()
const toast = useToast()
const route = useRoute()

const post:createdPost = reactive({
  title: '',
  price: 0,
  image_url: '',
  description: ''
})

const author:Profile = reactive({
  full_name: '',
  avatar_url: '',
  phone: ''
})

const isLoading = ref(false)

const getPost = async () => {
  try {
    isLoading.value = true

    const result = await supabase
      .from('posts')
      .select('title, price, image_url, description, profiles(full_name, phone, avatar_url)').eq('id', route.params.id)

    if (!result.error) {
      const data = result.data[0]
      post.title = data.title
      post.price = data.price
      post.image_url = data.image_url
      post.description = data.description

      author.full_name = data.profiles?.full_name
      author.avatar_url = data.profiles?.avatar_url
      author.phone = data.profiles?.phone
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка при получении данных', detail: getErrorMessage(error), life: 3000 })
  } finally {
    isLoading.value = false
  }
}

getPost()

</script>

<template>
  <LoadSpinner v-if="isLoading" />

  <Post v-else :data="post">
    <template #sidebar>
      <ContactCart :data="author" />
    </template>
  </Post>
</template>
