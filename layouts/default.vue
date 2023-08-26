<template>
  <div>
    <Header />
    <main class="main-container">
      <CToast />
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
</style>
