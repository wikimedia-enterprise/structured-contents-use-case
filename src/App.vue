<script setup lang="ts">
import { ref, provide } from 'vue'
import { NLayout, NLayoutContent, NConfigProvider, NImage, NMessageProvider } from 'naive-ui'
import AuthModal from '@/components/AuthModal.vue'
import SearchPanel  from '@/components/SearchPanel.vue'
import KnowledgePanel from '@/components/KnowledgePanel.vue'
import { darkTheme } from 'naive-ui'
import logoImage from '@/assets/logo.png'
import { Auth, type IAuth } from '@/libraries/auth'
import { WMF, type IWMF } from '@/libraries/wmf'
import { WME, type IWME } from '@/libraries/wme'
import { SOCK, type ISOCK} from '@/libraries/sock';

provide('auth', new Auth() as IAuth)
provide('wmf', new WMF() as IWMF)
provide('wme', new WME() as IWME)
provide('sock', new SOCK() as ISOCK)

const name = ref('')
const primaryColor = '#4263eb'
const themeOverrides = {
  common: {
    primaryColor,
    primaryColorHover: primaryColor
  }
}
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-layout class="wme-app-container">
        <n-layout-content>
          <n-image
            preview-disabled
            :height="69"
            :src="logoImage"
            class="wme-app-logo"
          />
          <search-panel v-model:name="name"/>
          <knowledge-panel :name="name"/>
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
</style>
