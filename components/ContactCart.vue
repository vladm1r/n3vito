<script setup lang="ts">
import type { Profile } from '@/types'

defineProps<{
  data: Profile
}>()
</script>

<template>
  <div class="contact-cart">
    <div>
      <h4 class="contact-cart__name">
        {{ data.full_name }}
      </h4>
      <a :href="`tel:${data.phone}`" class="contact-cart__phone"> {{ data.phone }}</a>
    </div>

    <ElAvatar :src="data.avatar_url" :icon="ElIconUserFilled" />
  </div>
</template>

<style lang="scss">
.contact-cart {
  display: flex;
  gap: 20px;

  &__name {
    font-size: $font-size-md;
    margin: 0 0 4px 0;
  }

  &__phone {
    font-size: $font-size-main;
    text-decoration: none;
    color: $color-primary;
  }
}

</style>
