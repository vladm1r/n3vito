<template>
  <article class="post">
    <div class="post__header">
      <h1 class="post__title">
        {{ postTemplate.title }}
      </h1>

      <PriceDisplay :value="postTemplate.price" class="post__price" />
    </div>

    <div class="post__body">
      <div>
        <div class="post__img-container">
          <Image image-class="post__img" :src="postTemplate.image" />
        </div>

        <h3 class="post__description-title">
          Описание
        </h3>

        <p class="post__desctiption">
          {{ postTemplate.description }}
        </p>
      </div>

      <ContactCart />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Post } from 'types'

const postTemplate: Post = {
  title: 'Супер гитара',
  price: 10999,
  image: '/img/guitar.jpg',
  description: 'Купите гитару пожалуйста'
}

</script>

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

    @media(max-width: $bp-mobile) {
      background: none;
      height: auto;
    }
  }

  &__img {
    height: 100%;
  }

  &__description-title {
    font-size: $font-size-xl;
  }

  &__desctiption {
    font-size: $font-size-main;
  }
}

</style>
