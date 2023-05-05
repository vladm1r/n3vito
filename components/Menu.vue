<template>
  <div class="menu-container">
    <el-avatar :src="avatarSource" fit="cover" />
    <div v-if="state.isLogged">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-sub-menu index="2">
          <template #title>
            {{ testUser.name }}
          </template>
          <el-menu-item index="2-1">
            item one
          </el-menu-item>
          <el-menu-item index="2-2">
            item two
          </el-menu-item>
          <el-menu-item index="2-3">
            item three
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div v-else @click="toggleLogin">
      Вход
    </div>
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
  gap: 12px
}
</style>
