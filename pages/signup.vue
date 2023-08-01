<template>
  <div class="login-form-container">
    <FormKit
      type="form"
      submit-label="Зарегистрироваться"
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
      Уже есть аккаунт? <NuxtLink to="login">
        Войти
      </NuxtLink>
    </p>
  </div>
</template>

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
