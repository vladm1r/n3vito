<template>
  <div class="login-form-container">
    <c-toast />

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
import { useToast } from 'primevue/usetoast'
const client = useSupabaseAuthClient()

const toast = useToast()
const email = ref('')
const password = ref('')

async function onSubmit () {
  try {
    const response = await client.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (response.error) {
      throw new Error(response.error.message)
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка регистрации', detail: 'Что-то пошло не так', life: 3000 })
  }
}
</script>
