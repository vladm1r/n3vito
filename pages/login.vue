<script setup lang="ts">
import { ElNotification } from 'element-plus'

const client = useSupabaseClient()

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
    ElNotification({ type: 'error', title: 'Ошибка авторизации', message: getErrorMessage(error) })
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
}
</style>
