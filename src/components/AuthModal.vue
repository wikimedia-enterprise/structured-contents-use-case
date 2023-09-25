<script setup lang="ts">
import { NModal, NSpace, NCard, NInput, NForm, NFormItem, NButton, type FormInst, useMessage } from 'naive-ui'
import { type IAuth } from '@/libraries/auth'
import { ref, inject } from 'vue'

const isAuthenticated = ref(!!localStorage.getItem('access_token'))
const loading = ref(false)
const message = useMessage()
const formRules = {
  username: {
    required: true,
    trigger: ['input', 'blur'],
    message: 'Username is required!'
  },
  password: {
    required: true,
    message: 'Password is required!'
  },
}
const formModel = ref({
  username: '',
  password: ''
})
const formRef = ref<null | FormInst>(null)
const auth = inject('auth') as IAuth
async function onSubmit(event: Event) {
  event.preventDefault()
  loading.value = true

  try {
    await formRef?.value?.validate()
    const req = {
      username: formModel.value.username, 
      password: formModel.value.password
    }
    const res = await auth.login(req)
    localStorage.setItem('access_token', res.access_token)
    localStorage.setItem('refresh_token', res.refresh_token)
    localStorage.setItem('expires_in', res.expires_in.toString())
    localStorage.setItem('auth_time', new Date().toISOString())
    localStorage.setItem('username', req.username)
    isAuthenticated.value = true
  } catch (err: any) {
    if (!Array.isArray(err)) {
      message.error(err.toString())
    }
  }

  loading.value = false
}
const expiresIn = localStorage.getItem('expires_in')
const authTime = localStorage.getItem('auth_time')

if (expiresIn && authTime) {
  const expiresInDate = new Date(authTime)
  expiresInDate.setSeconds(expiresInDate.getSeconds() + parseInt(expiresIn))

  if (new Date() >= expiresInDate) {
    try {
      const req = {
        refresh_token: localStorage.getItem('refresh_token') || '',
        username: localStorage.getItem('username') || ''
      }
      const res = await auth.refreshToken(req)
      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('expires_in', res.expires_in.toString())
      localStorage.setItem('auth_time', new Date().toISOString())
    } catch (err: any) { 
      if (!Array.isArray(err)) {
        message.error(err.toString())
      }
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_in')
      localStorage.removeItem('auth_time')
      localStorage.removeItem('username')
    }
  }
}
</script>

<template>
  <div class="wme-app-auth">
    <n-modal 
      :show="!isAuthenticated"
      :close-on-esc="false" 
      :mask-closable="false"
    >
      <n-card class="wme-app-auth-card">
        <n-space vertical>
          <n-form
            ref="formRef"
            :rules="formRules"
            :model="formModel"
            @submit="onSubmit"
          >
            <n-form-item label="Username:" path="username">
              <n-input
                placeholder="Your username or email"
                v-model:value="formModel.username"
                v-model:disabled="loading"
              />
            </n-form-item>
            <n-form-item label="Password:" path="password">
              <n-input
                placeholder="Your password"
                type="password"
                v-model:disabled="loading"
                v-model:value="formModel.password"
              />
            </n-form-item>
            <div class="wme-app-auth-actions">
              <a href="https://dashboard.enterprise.wikimedia.com/signup/" target="_blank">
                <n-button>Sign Up</n-button>
              </a>
              <n-button 
                attr-type="submit"
                v-model:disabled="loading"
              >Login</n-button>
            </div>
          </n-form>
        </n-space>
      </n-card>
    </n-modal>
  </div>
</template>

<style>
.wme-app-auth-card {
  max-width: 450px;
}

.wme-app-auth-actions {
  display: flex;
  justify-content: space-between;
}
</style>
