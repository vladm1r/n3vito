<script setup lang="ts">
const client = useSupabaseAuthClient()
const email = ref('')
const password = ref('')

async function onSubmit () {
  try {
    const response = await client.auth.signUp({
      email: email.value,
      password: password.value
    })

    console.log(response)
  } catch (error) {

  }
}
</script>

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

    <p>
      Нет аккаунта? <NuxtLink to="signup">
        Зарегистрируйтесь
      </NuxtLink>
    </p>
  </div>
</template>

<style lang="scss">
.login-form-container {
  padding: 120px 0 40px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
