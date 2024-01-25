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
  },
  deepSearch: {
    type: Boolean,
    required: false
  },
})

const sectionText = computed(() => {
  const parts = props.section?.has_parts || []
  let paragraphs = parts.map((part: Part) => part.value).join(' ').trim()

  if (!paragraphs && props.deepSearch) {
    paragraphs = parts.map((part: Part) => part.has_parts?.map((part: Part) => part.value).flat()).join(' ').trim()
  }

  return paragraphs.length > props.textSize ? `${paragraphs.slice(0, props.textSize - 1)}...` : paragraphs
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
