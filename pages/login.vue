<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const client = useSupabaseAuthClient()

const email = ref('')
const password = ref('')

async function onSubmit () {
  try {
    const response = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (response.error) {
      throw new Error(response.error.message)
    } else {
      navigateTo('/')
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка авторизации', detail: getErrorMessage(error), life: 3000 })
  }
}
</script>

<template>
  <div class="login-form-container">
    <c-toast />

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
}
</style>
