<script setup lang="ts">
import type { createdPost } from '@/types'

defineProps<{
  data: createdPost
}>()
</script>

<template>
  <div class="post-preview">
    <div class="post-preview__image-container">
      <NuxtLink :to="`post/${data.id}`">
        <ElImage image-class="post-preview__image" :src="data.image_url" />
      </NuxtLink>
    </div>

    <div class="post-preview__content">
      <h3 class="post-preview__title">
        <NuxtLink :to="`post/${data.id}`">
          {{ data.title }}
        </NuxtLink>
      </h3>

      <PriceDisplay :value="data.price" class="post-preview__price" />

      <p class="post-preview__description">
        {{ data.description }}
      </p>
    </div>

    <div class="post-preview__menu-container">
      <slot name="menu" />
    </div>
  </div>
</template>

<style lang="scss">
.post-preview {
  position: relative;
  border: 1px solid $color-secondary;
  border-radius: $border-radius;
  padding: 20px 40px 20px 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;

  @media (max-width: $bp-mobile) {
    display: block;
  }

  &__image-container {
    img {
      max-width: 100%;
    }

    @media (max-width: $bp-mobile) {
      margin-bottom: 20px;
    }
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: 700;
    margin: 0 0 12px 0;

    a {
      color: $color-text-primary;
      text-decoration: none;
    }
  }

  &__price {
    font-size: $font-size-xl;
  }

  &__menu-container {
    position: absolute;
    right: 12px;
    top: 20px;
  }
}

</style>
