<template>
  <NuxtLink to="/" class="logo">
    n3vito
  </NuxtLink>
</template>

<style lang="scss">
.logo {
  font-size: 40px;
  text-decoration: none;
  color: $color-text-primary;

  @media(max-width: $bp-mobile) {
    font-size: 28px;
  }
}
</style>
