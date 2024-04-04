<script setup lang="ts">
import { ElNotification } from 'element-plus'
import { debounce } from '@/lib/debounce'
import type { createdPost } from '@/types'

const supabase = useSupabaseClient()

const posts: Ref<createdPost[]> = ref([])

const searchQuery = ref('')

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
      .select('*', { count: 'exact' }).ilike('title', `%${searchQuery.value}%`).range(from, to)

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

const handleInput = debounce(() => {
  getPosts()
})

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
    <ElInput
      v-model="searchQuery"
      placeholder="Что вы ищите?"
      size="large"
      :prefix-icon="ElIconSearch"
      class="main-search"
      @input="handleInput"
    />

    <ElSkeleton v-if="isLoading" :rows="5" animated />

    <PostPreview v-for="post in posts" v-else :key="post.id" :data="post" />

    <ElPagination
      v-if="pagesCount"
      background
      layout="prev, pager, next"
      hide-on-single-page
      :current-page="currentPage"
      :page-size="PER_PAGE"
      :total="pagesCount"
      class="pagina"
      @current-change="hanglePageChange"
    />
  </div>
</template>

<style lang="scss">
.main-search {
  margin-bottom: 32px;
}
</style>
