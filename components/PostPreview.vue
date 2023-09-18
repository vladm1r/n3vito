<script setup lang="ts">
import { Storages } from '@/types'

defineProps<{
  data: object
}>()
</script>

<template>
  <div class="post-preview">
    <div class="post-preview__image-container">
      <RemoteImageProvider v-slot="image" :image-url="data.image_url" :storage="Storages.IMAGES">
        <CImage image-class="post-preview__image" :src="image.src" />
      </RemoteImageProvider>
    </div>

    <div class="post-preview__content">
      <h3 class="post-preview__title">
        {{ data.title }}
      </h3>

      <PriceDisplay :value="data.price" class="post-preview__price" />

      <p class="post-preview__description">
        {{ data.description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.post-preview {
  border: 1px solid #000;
  padding: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;

  &__image-container {
    img {
      max-width: 100%;
    }
  }

  &__title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 12px 0;
  }

  &__price {
    font-size: 24px;
  }

  &__description {
    font-size: 16px;
  }
}

</style>
