<script setup lang="ts">
import { ElNotification } from 'element-plus'

const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')

const isSignUpMode = ref(false)

const submitLabel = computed(() => {
  return isSignUpMode.value ? 'Зарегистрироваться' : 'Войти'
})

const emailPlaceholder = computed(() => {
  return isSignUpMode.value ? 'Подтверждения не требуется :)' : 'example@mail.ru'
})

const login = async () => {
  try {
    const response = await supabase.auth.signInWithPassword({
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

const signup = async () => {
  try {
    const response = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })

    if (response.error) {
      throw new Error(response.error.message)
    } else {
      navigateTo('/')
    }
  } catch (error) {
    ElNotification({ type: 'error', title: 'Ошибка регистрации', message: getErrorMessage(error) })
  }
}

const onSubmit = () => {
  if (isSignUpMode.value) {
    signup()
  } else {
    login()
  }
}

</script>

<template>
  <div class="login-form-container">
    <FormKit
      type="form"
      :submit-label="submitLabel"
      @submit="onSubmit"
    >
      <FormKit
        v-model="email"
        type="email"
        label="Ваша почта"
        :placeholder="emailPlaceholder"
      />
      <FormKit
        v-model="password"
        type="password"
        label="Ваш пароль"
      />
    </FormKit>

    <p v-if="!isSignUpMode">
      Нет аккаунта?
      <ElButton type="primary" text @click="isSignUpMode = true">
        Зарегистрируйтесь
      </ElButton>
    </p>

    <p v-else>
      Есть аккаунт?
      <ElButton type="primary" text @click="isSignUpMode = false">
        Войдите
      </ElButton>
    </p>
  </div>
</template>

<style lang="scss">
.login-form-container {
  padding: 120px 0 40px 0;
}
</style>
