<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'

defineProps({
  icon: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['click'])
</script>

<template>
  <div v-bind="$attrs" class="wme-app-knowledge-panel-icon-button">
    <n-button circle @click="emit('click')" size="small">
      <n-icon :size="12" :component="icon" />
    </n-button>
  </div>
</template>

<style>
.wme-app-knowledge-panel-icon-button {
  display: inline-block;
}
</style>
