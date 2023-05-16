<template>
  <NuxtLink to="/" class="logo">
    n3vito
  </NuxtLink>
</template>

<style lang="scss">
.logo {
  font-size: $font-size-3xl;
  text-decoration: none;
  color: $color-text-primary;

  @media(max-width: $bp-mobile) {
    font-size: $font-size-2xl;
  }
}
</style>
