<template>
  <div class="menu-container">
    <c-button
      v-if="!state.isLogged"
      type="button"
      label="Вход"
      icon="pi pi-user"
      outlined
      @click="toggleLogin"
    />

    <c-button
      v-else
      type="button"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      class="menu-button"
      rounded
      @click="toggle"
    >
      <c-avatar :image="menuAvatarSource" shape="circle" size="large" />
    </c-button>

    <c-menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import type { User, MenuItem } from 'types'

const state = reactive({ isLogged: false })

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
  return state.isLogged ? testUser.avatar : '/img/avatar-default.png'
})

const toggleLogin = () => {
  state.isLogged = !state.isLogged
}

const toggle = (event:Event) => {
  menu.value.toggle(event)
}
</script>

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
