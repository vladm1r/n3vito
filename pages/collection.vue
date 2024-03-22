<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { createdPost } from '@/types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const posts: Ref<createdPost[]> = ref([])

const isLoading = ref(false)

const getPosts = async () => {
  try {
    isLoading.value = true

    const result = await supabase
      .from('posts')
      .select().eq('user_id', user.value.id)

    if (!result.error) {
      posts.value = result.data
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка при получении данных', message: getErrorMessage(error) })
  } finally {
    isLoading.value = false
  }
}

getPosts()

</script>

<template>
  <LoadSpinner v-if="isLoading" />
  <div v-else>
    <PostPreview v-for="post in posts" :key="post.id" :data="post">
      <template #menu>
        <ElButton :icon="ElIconEdit" circle @click="navigateTo(`/post/update/${post.id}`)" />
      </template>
    </PostPreview>
  </div>
</template>
