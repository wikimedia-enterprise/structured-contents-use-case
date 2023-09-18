<script setup lang="ts">
import { NLayout, NLayoutContent, NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'

const primaryColor = '#4263eb'
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontSize: '18px',
    primaryColor: primaryColor,
    primaryColorHover: primaryColor,
  }
}
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-layout class="wme-app-container">
      <n-layout-content></n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<style >
.wme-app-container {
  min-height: 100vh !important;
}
</style>
