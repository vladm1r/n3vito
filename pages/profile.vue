<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { Profile } from '@/types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const profile:Ref<Profile | undefined> = ref()

const isLoading = ref(false)

const getProfileData = async () => {
  try {
    isLoading.value = true

    const result = await supabase
      .from('profiles')
      .select('id, full_name, phone, avatar_url')
      .eq('id', user.value.id)
      .single()

    if (!result.error) {
      profile.value = result.data
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка обновления профиля', message: getErrorMessage(error) })
  } finally {
    isLoading.value = false
  }
}

const updateProfile = async () => {
  try {
    const updateData = {
      updated_at: new Date(),
      ...profile.value
    }

    const result = await supabase.from('profiles').update(updateData).eq('id', user.value.id)

    if (!result.error) {
      ElNotification({ type: 'success', title: 'Профиль обновлён', message: 'Данные успешно обновлены' })
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка обновления профиля', message: getErrorMessage(error) })
  }
}

getProfileData()
</script>

<template>
  <LoadSpinner v-if="isLoading" />

  <FormKit
    v-else-if="profile"
    type="form"
    submit-label="Обновить"
    @submit="updateProfile"
  >
    <AvatarFormElement v-model="profile.avatar_url" />

    <FormKit
      v-model="profile.full_name"
      type="text"
      label="Ваше имя"
    />

    <FormKit
      v-model="profile.phone"
      type="text"
      label="Ваш телефон"
    />
  </FormKit>
</template>
