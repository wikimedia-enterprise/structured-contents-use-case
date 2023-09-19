<script setup lang="ts">
import { NModal, NSpace, NCard, NInput, NForm, NFormItem, NButton, type FormInst, useMessage } from 'naive-ui'
import { defineProps, toRef, ref } from 'vue'
import { Auth } from './../lib/auth'

const props = defineProps({
  isAuthenticated: {
    type: Boolean,
    default: false
  }
})
const loading = ref(false)
const isAuthenticatedValue = toRef(props, "isAuthenticated");
const emit = defineEmits(["update:isAuthenticated"]);
const message = useMessage();
const formRules = {
  username: {
    required: true,
    trigger: ["input", "blur"],
    message: "Username is required!",
  },
  password: {
    required: true,
    message: "Password is required!",
  },
};
const formModel = ref({
  username: "",
  password: "",
});
const formRef = ref<null | FormInst>(null) ;
const auth = new Auth()

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
    emit("update:isAuthenticated", true)
  } catch (err: any) {
    if (!Array.isArray(err)) {
      message.error(err.toString());
    }
  }

  loading.value = false
}
</script>

<template>
  <div class="wme-app-auth">
    <n-modal 
      :show="!isAuthenticatedValue"
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
