<script setup lang="ts">
import { ref } from 'vue'
import { NLayout, NLayoutContent, NConfigProvider, NImage, NMessageProvider, NSpin, type GlobalTheme } from 'naive-ui'
import { type StructuredContent, WME } from './lib/wme'
import AuthModal from './components/AuthModal.vue'
import SearchPanel  from './components/SearchPanel.vue'
import KnowledgePanel from './components/KnowledgePanel.vue'
import { darkTheme } from 'naive-ui'
import logoImage from './assets/logo.png'

const loading = ref(false)
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

  try {
    const structuredContents = await wme.getStructuredContents(value)

    if (structuredContents.length > 0) {
      structuredContent.value = structuredContents[0]
    }
  } catch (err: any) {
    console.error(err)
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
          <search-panel :on-select="onSearchSelect"/>
          <n-spin size="large" v-if="loading" class="wme-app-container-loader" />
          <knowledge-panel v-if="!loading" :structured-content="structuredContent"/>
          <suspense>
            <auth-modal />
          </suspense>
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
