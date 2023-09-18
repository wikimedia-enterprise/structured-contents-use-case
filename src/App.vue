<script setup lang="ts">
import { NLayout, NLayoutContent, NConfigProvider, type GlobalTheme } from 'naive-ui'
import Search  from './components/Search.vue'
import { darkTheme } from 'naive-ui'

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
        <search/>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<style>
.wme-app-container {
  min-height: 100vh !important;
}
</style>
