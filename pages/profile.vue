<script setup lang="ts">
import { ElNotification } from 'element-plus'
import type { Profile } from '../types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const profile:Profile = reactive({
  full_name: '',
  phone: '',
  avatar_url: ''
})

const isLoading = ref(false)

const getProfileData = async () => {
  try {
    isLoading.value = true

    const result = await supabase
      .from('profiles')
      .select('full_name, phone, avatar_url')
      .eq('id', user.value.id)
      .single()

    if (!result.error) {
      profile.full_name = result.data.full_name
      profile.phone = result.data.phone
      profile.avatar_url = result.data.avatar_url
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
      id: user.value.id,
      updated_at: new Date(),
      ...profile
    }

    const result = await supabase.from('profiles').update(updateData, {
      returning: 'minimal'
    })

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
    v-else
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
