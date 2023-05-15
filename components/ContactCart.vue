<template>
  <div class="contact-cart">
    <div>
      <h4 class="contact-cart__name">
        {{ testUser.name }}
      </h4>
      <a :href="`tel:${testUser.phone}`" class="contact-cart__phone"> {{ testUser.phone }}</a>
    </div>

    <UserAvatar :src="testUser.avatar" />
  </div>
</template>

<script setup lang="ts">
import type { User } from 'types'

const testUser:User = {
  name: 'Иван Иванов',
  phone: '+79035748779'
}

</script>

<style lang="scss">
.contact-cart {
  display: flex;
  gap: 20px;

  &__name {
    font-size: 18px;
    margin: 0 0 4px 0;
  }

  &__phone {
    font-size: 16px;
    text-decoration: none;
  }
}

</style>
