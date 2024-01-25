<script setup lang="ts">
import { computed } from 'vue'
import { type Part } from '@/libraries/wme'
import KnowledgePanelSectionText from '@/components/KnowledgePanelSectionText.vue'
import { PartTypeSection, PartTypeParagraph } from '@/libraries/wme'
import { NCollapse, NCollapseItem } from 'naive-ui'

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
})
const hasParagraphs = (part: Part) => part?.has_parts?.some(part => part.type == PartTypeParagraph)
const isNestedSection = computed(() => (props.section as Part)?.has_parts?.some((part: Part) => hasParagraphs(part)))
const nestedSections = computed(() => props.section?.has_parts?.filter((part: Part) => part.type == PartTypeSection))
const expandedNames = computed(() => isNestedSection.value && !hasParagraphs(props.section as Part) ? [nestedSections.value[0]?.name] : [])
</script>

<template>
  <div class="wme-app-knowledge-panel-section">
    <knowledge-panel-section-text :url="url" :textSize="sectionTextSize" :section="section" />
    <n-collapse v-if="isNestedSection" :default-expanded-names="expandedNames" :key="section?.name">
      <n-collapse-item v-for="section in nestedSections" :key="section.name" :name="section.name">
        <template #header><b><i>{{ section.name }}</i></b></template>
        <knowledge-panel-section-text :url="url" :textSize="sectionTextSize" :section="section" deep-search />
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<style>
.wme-app-knowledge-panel-section a {
  color: white !important;
}

.wme-app-knowledge-panel-section {
  padding: 1em 0 0 0;
}

.wme-app-knowledge-panel-section-nested-sections {
  margin: 5px 0 0 0;
  padding: 0 0 0 25px;
}

.wme-app-knowledge-panel-section .n-collapse .n-collapse-item:not(:first-child) {
  border-top: none;
  margin-top: 0;
}

.wme-app-knowledge-panel-section .n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner, 
.wme-app-knowledge-panel-section .n-collapse .n-collapse-item .n-collapse-item__header {
  padding: 4px 0 4px 0;
}
</style>
