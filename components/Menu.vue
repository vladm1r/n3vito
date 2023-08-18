<script setup lang="ts">
import type { User, MenuItem } from 'types'

const isLogged = ref(false)

const menu = ref()

const menuItems = ref<MenuItem[]>([
  {
    label: 'Профиль',
    icon: 'pi pi-user'
  },
  {
    label: 'Объявления',
    icon: 'pi pi-star'
  },
  {
    label: 'Выход',
    icon: 'pi pi-sign-out'
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

const toggle = (event:Event) => {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="menu-container">
    <CButton
      v-if="!isLogged"
      type="button"
      label="Вход"
      icon="pi pi-user"
      outlined
      @click="toggleLogin"
    />

    <CButton
      v-else
      type="button"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      class="menu-button"
      rounded
      @click="toggle"
    >
      <CAvatar :image="menuAvatarSource" shape="circle" size="large" />
    </CButton>

    <CMenu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" />
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

.p-menu {
  margin-top: 8px;
}

</style>
