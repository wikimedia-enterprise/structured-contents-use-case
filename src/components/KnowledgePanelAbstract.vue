<script setup lang="ts">
import { computed } from 'vue'
import KnowledgePanelReadMore from '@/components/KnowledgePanelReadMore.vue'

const props = defineProps({
  abstract: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  abstractTextSize: {
    type: Number,
    required: true
  }
})
const abstractText = computed(() => {
  return props.abstract.length > props.abstractTextSize ? 
    `${props.abstract.slice(0, props.abstractTextSize - 1)}...` : props.abstract
})
</script>

<template>
  <p class="wme-app-knowledge-panel-abstract">
    {{ abstractText }} <knowledge-panel-read-more v-if="url && abstract.length > abstractTextSize" :url="`${url}#firstHeading`" />
  </p>
</template>

<style></style>
