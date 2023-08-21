<script setup lang="ts">
const user = useSupabaseUser()

const name = ref('')
const phone = ref('')
const text = ref('')
const avatarPath = ref('')

const onSubmit = () => {
  console.log(text.value)
}
</script>

<template>
  <FormKit
    type="form"
    submit-label="Войти"
    @submit="onSubmit"
  >
    <AvatarFormElement v-model="avatarPath" />

    <FormKit
      v-model="name"
      type="text"
      label="Ваше имя"
    />

    <FormKit
      v-model="phone"
      type="text"
      label="Ваш телефон"
    />
  </FormKit>
</template>
