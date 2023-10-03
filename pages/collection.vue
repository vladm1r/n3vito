<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import type { createdPost } from 'types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()

const posts = ref([])

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
    toast.add({ severity: 'error', summary: 'Ошибка при получении данных', detail: getErrorMessage(error), life: 3000 })
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
        <CButton icon="pi pi-file-edit" rounded outlined @click="navigateTo(`/post/update/${post.id}`)" />
      </template>
    </PostPreview>
  </div>
</template>
