<template>
  <div class="contact-cart">
    <div>
      <h4 class="contact-cart__name">
        {{ testUser.name }}
      </h4>
      <a :href="`tel:${testUser.phone}`" class="contact-cart__phone"> {{ testUser.phone }}</a>
    </div>

    <c-avatar :image="testUser.avatar" shape="circle" />
  </div>
</template>

<script setup lang="ts">
import type { User } from 'types'

const testUser:User = {
  name: 'Иван Иванов',
  phone: '+79035748779',
  avatar: '/img/kotik.jpg'
}

</script>

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
