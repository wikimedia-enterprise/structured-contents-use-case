<script setup lang="ts">
import { computed } from 'vue'
import KnowledgePanelReadMore from './KnowledgePanelReadMore.vue'

const props = defineProps({
  abstract: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  abstractSize: {
    type: Number,
    required: true
  }
})
const abstractText = computed(() => {
  return props.abstract.length > props.abstractSize ? 
    `${props.abstract.slice(0, props.abstractSize - 1)}...` : props.abstract
})
</script>

<template>
  <p class="wme-app-knowledge-panel-abstract">
    {{ abstractText }} <knowledge-panel-read-more v-if="url && abstract.length > abstractSize" :url="`${url}#firstHeading`" />
  </p>
</template>

<style></style>
