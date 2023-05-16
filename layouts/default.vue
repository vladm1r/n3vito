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
}
</style>
