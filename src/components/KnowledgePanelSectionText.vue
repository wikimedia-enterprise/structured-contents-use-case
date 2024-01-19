<script setup lang="ts">
import { computed } from 'vue'
import { type Part } from '@/libraries/wme'
import KnowledgePanelReadMore from '@/components/KnowledgePanelReadMore.vue'

const props = defineProps({
  url: {
    type: String,
    required: true
  },
  section: {
    type: Object,
    required: true
  },
  textSize: {
    type: Number,
    required: true
  }
})

const sectionText = computed(() => {
  const parts = props.section?.has_parts || []
  const paragraphs = parts.map((part: Part) => part.value).join(' ')
  const text = paragraphs.length > props.textSize ? `${paragraphs.slice(0, props.textSize - 1)}...` : paragraphs
  return text.trim()
})
</script>
<template>
  <p class="wme-app-knowledge-panel-section-text" v-if="sectionText">
    {{ sectionText }} <knowledge-panel-read-more :url="`${url}#${section.name?.replace(/\s/g, '_')}`" />
  </p>
</template>
<style>
.wme-app-knowledge-panel-section-text {
  margin: 0 0 1em 0;
}
</style>
