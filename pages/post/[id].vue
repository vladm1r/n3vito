<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { createdPost, Profile } from '@/types'

const supabase = useSupabaseClient()

const route = useRoute()

const post:Ref<createdPost | undefined> = ref()
const author:Ref<Profile | undefined> = ref()

const isLoading = ref(false)

const getPost = async () => {
  try {
    isLoading.value = true

    const result = await supabase
      .from('posts')
      .select('id, title, price, image_url, description, profiles(id, full_name, phone, avatar_url)').eq('id', route.params.id)

    if (!result.error) {
      post.value = result.data[0]
      author.value = result.data[0].profiles
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка при получении данных', message: getErrorMessage(error) })
  } finally {
    isLoading.value = false
  }
}

getPost()

</script>

<template>
  <ElSkeleton v-if="isLoading" :rows="5" animated />

  <Post v-else-if="post" :data="post">
    <template #sidebar>
      <ContactCart v-if="author" :data="author" />
    </template>
  </Post>
</template>
