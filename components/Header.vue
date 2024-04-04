<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <header>
    <div class="header-container">
      <Logo />
      <Menu v-if="user" />
    </div>
  </header>
</template>

<style lang="scss">
.header-container {
  max-width: $container-width;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
