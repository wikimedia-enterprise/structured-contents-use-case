<script setup lang="ts">
import { NLayout, NLayoutContent, NConfigProvider, NImage, type GlobalTheme } from 'naive-ui'
import Search  from './components/Search.vue'
import KnowledgePanel from './components/KnowledgePanel.vue'
import Auth from './components/Auth.vue'
import { darkTheme } from 'naive-ui'
import logoImage from './assets/logo.png'

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
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout class="wme-app-container">
      <n-layout-content>
        <n-image
          preview-disabled
          :height="69"
          :src="logoImage"
          class="wme-app-logo"
        />
        <search/>
        <knowledge-panel/>
        <auth/>
      </n-layout-content>
    </n-layout>
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
  justify-content: center;
}

.wme-app-logo {
  margin-top: 40px;
  margin-bottom: 40px;
}

.wme-app-knowledge-panel {
  margin-top: 15px;
}
</style>
