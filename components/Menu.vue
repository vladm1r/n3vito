<template>
  <div class="menu-container">
    <el-avatar :src="avatarSource" fit="cover" />

    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
    >
      <el-menu-item v-if="!state.isLogged" index="1" @click="toggleLogin">
        Вход
      </el-menu-item>

      <el-sub-menu v-else index="2">
        <template #title>
          {{ testUser.name }}
        </template>
        <el-menu-item index="2-1">
          Профиль
        </el-menu-item>
        <el-menu-item index="2-2">
          Мои объявления
        </el-menu-item>
        <el-menu-item index="2-3">
          Выход
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
const state = reactive({ isLogged: false })

interface userTemplate {
  name: string,
  avatar: string
}

const testUser:userTemplate = {
  name: 'Иван Иванов',
  avatar: '/img/kotik.jpg'
}

const avatarSource = computed<string>(() => {
  return state.isLogged ? testUser.avatar : '/img/avatar-default.png'
})

const toggleLogin = () => {
  state.isLogged = !state.isLogged
}
</script>

<style>
.menu-container {
  display: flex;
  align-items: center;
}

.el-menu--horizontal {
  border-bottom: 0;
}
</style>
