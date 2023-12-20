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
  sectionTextSize: {
    type: Number,
    required: true
  },
  nestedSectionTextSize: {
    type: Number,
    default: 100
  }
})
function hasParagraphs(part: Part) {
  return part?.has_parts?.some(part => part.type == 'paragraph')
}
const isNestedSection = computed(() =>  (props.section as Part)?.has_parts?.some((part: Part) => hasParagraphs(part)))
const nestedSections = computed(() => props.section?.has_parts?.filter((part: Part) => part.type == 'section'))
const sectionTextSize = computed(() => isNestedSection.value ? props.nestedSectionTextSize : props.sectionTextSize)
const sectionText = computed(() => {
  let parts = props.section?.has_parts || []

  if (isNestedSection.value) {
    parts = parts.map((part: Part) => part.has_parts || []).flat()
  }

  const text = parts.map((part: Part) => part.value).join(' ')
  return text.length > sectionTextSize.value ? `${text.slice(0, sectionTextSize.value - 1)}...` : text
})
</script>

<template>
  <div class="wme-app-knowledge-panel-section">
    <p class="wme-app-knowledge-panel-section-text">
      {{ sectionText }} <knowledge-panel-read-more :url="`${url}#${section.name?.replace(/\s/g, '_')}`" />
    </p>
    <ul v-if="isNestedSection" class="wme-app-knowledge-panel-section-nested-sections">
      <li v-for="section in nestedSections" :key="section.name">
        <i><a target="_blank" :href="`${url}#${section.name?.replace(/\s/g, '_')}`">{{ section.name }}</a></i>
      </li>
    </ul>
  </div>
</template>

<style>
.wme-app-knowledge-panel-section a {
  color: white !important;
}

.wme-app-knowledge-panel-section-nested-sections {
  margin: 5px 0 0 0;
  padding: 0 0 0 25px;
}
</style>
