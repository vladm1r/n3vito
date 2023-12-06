<script setup lang="ts">
import type { User, MenuItem } from 'types'

const isLogged = ref(false)

const menuItems = ref<MenuItem[]>([
  {
    label: 'Профиль',
    icon: ElIconUser
  },
  {
    label: 'Объявления',
    icon: ElIconStar
  },
  {
    label: 'Выход',
    icon: ElIconSwitchButton
  }
])

const testUser:User = {
  name: 'Иван Иванов',
  avatar: '/img/kotik.jpg',
  phone: '+79035748779'
}

const menuAvatarSource = computed<string | undefined>(() => {
  return isLogged.value ? testUser.avatar : '/img/avatar-default.png'
})

const toggleLogin = () => {
  isLogged.value = !isLogged.value
}
</script>

<template>
  <div class="menu-container">
    <ElButton
      v-if="!isLogged"
      :icon="ElIconUser"
      type="primary"
      @click="toggleLogin"
    >
      Вход
    </ElButton>

    <ElDropdown v-else placement="bottom-end">
      <ElButton
        class="menu-button"
      >
        <ElAvatar :src="menuAvatarSource" size="large" />
      </ElButton>

      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem v-for="item in menuItems" :key="item.label" :icon="item.icon">
            {{ item.label }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<style>
.menu-container {
  display: flex;
  align-items: center;
}

.menu-button {
  margin: 0;
  border: 0;
  padding: 0;
  background: unset;

  &:hover {
    background: unset;
  }
}
</style>
