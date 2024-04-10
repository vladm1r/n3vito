<script setup lang="ts">
import type { MenuItem } from '@/types'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const profileAvatar:Ref<string | undefined> = ref()

const getUserAvatar = async () => {
  const result = await supabase.from('profiles')
    .select('avatar_url')
    .eq('id', user.value.id)

  if (!result.error) {
    profileAvatar.value = result.data[0].avatar_url
  }
}

if (user.value) {
  getUserAvatar()
}

const logOut = async () => {
  await supabase.auth.signOut()
}

const menuItems = ref<MenuItem[]>([
  {
    label: 'Профиль',
    icon: ElIconUser,
    action: () => navigateTo('/profile')
  },
  {
    label: 'Объявления',
    icon: ElIconStar,
    action: () => navigateTo('/collection')
  },
  {
    label: 'Новое объявление',
    icon: ElIconPlus,
    action: () => navigateTo('/post/create')
  },
  {
    label: 'Выход',
    icon: ElIconSwitchButton,
    action: logOut
  }
])

</script>

<template>
  <div class="menu-container">
    <ElDropdown placement="bottom-end">
      <ElButton
        class="menu-button"
      >
        <ElAvatar :src="profileAvatar" :icon="ElIconUserFilled" size="large" />
      </ElButton>

      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem v-for="item in menuItems" :key="item.label" :icon="item.icon" @click="item.action">
            {{ item.label }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<style>
.menu-button {
  margin: 0;
  border: 0;
  padding: 0;
  background: unset;
  border-radius: 50%;
  height: 100%;

  &:hover {
    background: unset;
  }
}
</style>
