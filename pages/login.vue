<template>
  <div class="login-form-container">
    <FormKit
      type="form"
      submit-label="Войти"
      @submit="onSubmit"
    >
      <FormKit
        v-model="email"
        type="email"
        label="Ваша почта"
      />
      <FormKit
        v-model="password"
        type="password"
        label="Ваш пароль"
      />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const email = ref(null)
const password = ref(null)

const onSubmit = () => {
  console.log(email.value, password.value)
}
</script>

<style lang="scss">
.login-form-container {
  padding: 120px 0 40px 0;
  display: flex;
  justify-content: center;
}
</style>
