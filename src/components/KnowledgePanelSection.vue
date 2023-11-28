<script setup lang="ts">
import { computed } from 'vue'
import { type Part } from '@/libraries/wme'
import KnowledgePanelReadMore from './KnowledgePanelReadMore.vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  section: {
    type: Object,
    required: true
  },
  sectionSize: {
    type: Number,
    required: true
  }
})
const partHasSubsections = (part?: Part) => part?.has_parts?.some(part => part.type == 'section')
const sectionText = computed(() => {
  let parts = props.section?.has_parts || []

  if (partHasSubsections(props.section as Part || null)) {
    parts = parts.map((part: Part) => part.has_parts || []).flat()
  }

  const text = parts.map((part: Part) => part.value).join(' ')
  return text.length > props.sectionSize ? `${text.slice(0, props.sectionSize - 1)}...` : text
})
</script>

<template>
  <p class="wme-app-knowledge-panel-abstract">
    {{ sectionText }} <knowledge-panel-read-more :url="`${url}#${section.name?.replace(/\s/g, '_')}`" />
  </p>
</template>

<style></style>
