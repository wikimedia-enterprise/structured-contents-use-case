<script setup lang="ts">
import { NTag, NIcon } from 'naive-ui'
import { Link48Regular } from '@vicons/fluent'
defineProps({
  url: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    default: Link48Regular
  },
  text: {
    type: String,
    required: true
  },
  target: {
    type: String,
    default: '_blank'
  }
})
</script>

<template>
  <div>
    <n-tag round>
      <a :href="url" :target="target">{{ text }}</a>
      <template #icon>
        <n-icon :component="icon" />
      </template>
    </n-tag>
  </div>
</template>

<style>
</style>
