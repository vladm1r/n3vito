<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
const toast = useToast()
const client = useSupabaseAuthClient()

const isSuccess = ref(false)

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
    } else {
      isSuccess.value = true
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Ошибка регистрации', detail: getErrorMessage(error), life: 3000 })
  }
}
</script>

<template>
  <div class="login-form-container">
    <div v-if="!isSuccess">
      <c-toast />

      <FormKit
        type="form"
        submit-label="Зарегистрироваться"
        @submit="onSubmit"
      >
        <FormKit
          v-model="email"
          type="email"
          validation="email|required"
          label="Ваша почта"
        />
        <FormKit
          v-model="password"
          type="password"
          label="Ваш пароль"
          validation="length:6,16|required"
        />
      </FormKit>

      <p>
        Уже есть аккаунт?
        <NuxtLink to="login">
          Войти
        </NuxtLink>
      </p>
    </div>

    <p v-else>
      Регистрация прошла успешно. Письмо с подтверждением отправлено на вашу почту {{ email }} <br>
      <NuxtLink to="/">
        На главную
      </NuxtLink>
    </p>
  </div>
</template>
