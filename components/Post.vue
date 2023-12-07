<script setup lang="ts">
import type { createdPost } from '@/types'
import { Storages } from '@/types'

defineProps<{
  data: createdPost
}>()

</script>

<template>
  <article class="post">
    <div class="post__header">
      <h1 class="post__title">
        {{ data.title }}
      </h1>

      <PriceDisplay :value="data.price" class="post__price" />
    </div>

    <div class="post__body">
      <div>
        <RemoteImageProvider v-slot="image" :image-url="data.image_url" :storage="Storages.IMAGES">
          <div class="post__img-container">
            <ElImage image-class="post__img" :src="image.src" />
          </div>
        </RemoteImageProvider>

        <h3 class="post__description-title">
          Описание
        </h3>

        <p class="post__desctiption">
          {{ data.description }}
        </p>
      </div>

      <slot name="sidebar" />
    </div>
  </article>
</template>

<style lang="scss">
.post {
  max-width: $container-width;
  margin: 0 auto;

  &__header {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;

    @media(max-width: $bp-mobile) {
      display: block;
    }
  }

  &__title {
    font-size: $font-size-2xl;

    @media(max-width: $bp-mobile) {
      font-size: $font-size-xl;
    }
  }

  &__price {
    font-size: $font-size-2xl;

    @media(max-width: $bp-mobile) {
      font-size: $font-size-xl;
    }
  }

  &__body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;

    @media(max-width: $bp-mobile) {
      display: block;
    }
  }

  &__img-container {
    height: 400px;
    background: #b2b2b2;
    text-align: center;
    overflow: hidden;
  }

  &__img {
    height: 100%;
    margin-left: 50%;
    transform: translate(-50%, 0);
  }

  &__description-title {
    font-size: $font-size-xl;
  }

  &__desctiption {
    font-size: $font-size-main;
  }
}
</style>
