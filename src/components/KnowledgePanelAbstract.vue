<script setup lang="ts">
import { computed } from 'vue'

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
    {{ abstractText }} <a v-if="url && abstract.length > abstractSize" target="_blank" class="wme-app-knowledge-panel-read-more" :href="`${url}#firstHeading`">{{ ' read more' }}</a>
  </p>
</template>

<style></style>
