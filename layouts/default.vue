<template>
  <div>
    <Header />
    <main class="main-container">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.main-container {
  max-width: $container-width;
  margin: 0 auto;
  padding-top: 40px;
}

.el-pagination {
  justify-content: center;
  margin-top: 32px;
}
</style>
