<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: 'read more'
  }
})
</script>

<template>
  <a target="_blank" class="wme-app-knowledge-panel-read-more" :href="url">{{ ` ${text}` }}</a>
</template>

<style>
.wme-app-knowledge-panel-read-more {
  color: white !important;
}
</style>
