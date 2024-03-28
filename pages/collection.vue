<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { createdPost } from '@/types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const posts: Ref<createdPost[]> = ref([])

const isLoading = ref(false)

const currentPage = ref(1)
const PER_PAGE = 3
const pagesCount:Ref<number | null> = ref(null)

const getPosts = async () => {
  try {
    isLoading.value = true

    const from = currentPage.value * PER_PAGE - PER_PAGE
    const to = currentPage.value * PER_PAGE - 1

    const result = await supabase
      .from('posts')
      .select('*', { count: 'exact' }).eq('user_id', user.value.id).range(from, to)

    if (!result.error) {
      posts.value = result.data
      pagesCount.value = result.count
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка при получении данных', message: getErrorMessage(error) })
  } finally {
    isLoading.value = false
  }
}

const hanglePageChange = (page:number) => {
  if (currentPage.value !== page) {
    currentPage.value = page
    getPosts()
  }
}

getPosts()
</script>

<template>
  <div>
    <LoadSpinner v-if="isLoading" />
    <div v-else>
      <PostPreview v-for="post in posts" :key="post.id" :data="post">
        <template #menu>
          <ElTooltip content="Редактировать объявление" placement="top-start">
            <ElButton :icon="ElIconEditPen" circle @click="navigateTo(`/post/update/${post.id}`)" />
          </ElTooltip>
        </template>
      </PostPreview>
    </div>

    <ElPagination
      v-if="pagesCount"
      background
      layout="prev, pager, next"
      hide-on-single-page
      :current-page="currentPage"
      :page-size="PER_PAGE"
      :total="pagesCount"
      @current-change="hanglePageChange"
    />
  </div>
</template>
