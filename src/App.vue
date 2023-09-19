<script setup lang="ts">
import { NLayout, NLayoutContent, NConfigProvider, NImage, NMessageProvider, NSpin, type GlobalTheme } from 'naive-ui'
import Search  from './components/Search.vue'
import KnowledgePanel from './components/KnowledgePanel.vue'
import Auth from './components/Auth.vue'
import { darkTheme } from 'naive-ui'
import logoImage from './assets/logo.png'
import { type StructuredContent, WME } from './lib/wme'
import { ref } from 'vue'

const loading = ref(false)
const isAuthenticated = ref(!!localStorage.getItem('access_token'))
const structuredContent = ref(null as null | StructuredContent)
const primaryColor = '#4263eb'
const theme: GlobalTheme = {
  ...darkTheme,
  common: {
    ...darkTheme.common,
    fontSize: '18px',
    primaryColor: primaryColor,
    primaryColorHover: primaryColor,
  }
}
const wme = new WME()
async function onSearchSelect(value: string) {
  loading.value = true

  const structuredContents = await wme.getStructuredContents(value)

  if (structuredContents.length > 0) {
    structuredContent.value = structuredContents[0]
  }

  loading.value = false
}
</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-layout class="wme-app-container">
        <n-layout-content>
          <n-image
            preview-disabled
            :height="69"
            :src="logoImage"
            class="wme-app-logo"
          />
          <search :on-select="onSearchSelect"/>
          <n-spin size="large" v-if="loading" class="wme-app-container-loader" />
          <knowledge-panel v-if="!loading" :structured-content="structuredContent"/>
          <auth v-model:is-authenticated="isAuthenticated"/>
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
.wme-app-container {
  min-height: 100vh !important;
  display: flex;
  width: 100%;
  justify-content: center;
}

.wme-app-container .n-layout-scroll-container {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
}

.wme-app-logo {
  margin-top: 40px;
  margin-bottom: 40px;
}

.wme-app-knowledge-panel {
  margin-top: 15px;
}

.wme-app-container-loader {
  margin-top: 50px;
}
</style>
