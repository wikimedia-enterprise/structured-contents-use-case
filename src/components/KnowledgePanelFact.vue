<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})
</script>

<template>
  <p class="wme-app-knowledge-panel-fact">
    <i class="wme-app-knowledge-panel-fact-name">{{ name.endsWith(':') ? name : `${name}:` }}</i>
    <b class="wme-app-knowledge-panel-fact-value">{{ value }}</b>
  </p>
</template>

<style>
.wme-app-knowledge-panel-fact-name {
  margin-right: 5px;
}
</style>
