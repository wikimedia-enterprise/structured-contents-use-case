<script setup lang="ts">
import { NCard, NImage, NSpin } from 'naive-ui'
import { watch, ref, inject, computed } from 'vue'
import { type StructuredContent, type IWME, type Part } from '@/libraries/wme'
import KnowledgePanelFact from '@/components/KnowledgePanelFact.vue'
import KnowledgePanelIconLink from '@/components/KnowledgePanelIconLink.vue'
import KnowledgePanelSectionSelector from '@/components/KnowledgePanelSectionSelector.vue'
import KnowledgePanelAbstract from '@/components/KnowledgePanelAbstract.vue'
import KnowledgePanelSection from '@/components/KnowledgePanelSection.vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const loading = ref(false)
const structuredContent = ref(null as null | StructuredContent)
const wme = inject('wme') as IWME
watch(() => props.name, async (value) => {
  loading.value = true
  wme.accessToken = localStorage.getItem('access_token') || ''
  structuredContent.value = null
  sectionIndex.value = 0

  try {
    const structuredContents = await wme.getStructuredContents(value)

    if (structuredContents.length > 0) {
      structuredContent.value = structuredContents[0]
    } else {
      structuredContent.value = null
    }
  } catch (err: any) {
    console.error(err)
  }

  loading.value = false
})
const facts = computed(() => {
  if (!structuredContent.value?.infobox) return []

  const infoBox = structuredContent.value.infobox[0]

  if (!infoBox.has_parts) return []

  const sections = infoBox.has_parts.map(section => section.has_parts || []).flat()

  if (!sections) return []

  return sections.filter(part => part.type == 'field' && part.name && part.value).slice(0, 5)
})
const sectionsFilter = (part: Part) => part?.has_parts?.some(part => part.type == 'paragraph')
const sections = computed(() => {
  const articleSections = structuredContent.value?.article_sections

  if (!articleSections) return []

  return [
    ...articleSections.filter((part) => sectionsFilter(part) || part.has_parts?.some(sectionsFilter)),
  ]
})
const sectionIndex = ref(0)
const activeSection = ref<Part|null>(null)
const defaultSectionTextSize = 380
const onSectionSelected = (index: number, section: Part) => {
  sectionIndex.value = index
  activeSection.value = section
}
</script>

<template>
  <div class="wme-app-knowledge-panel">
    <div v-if="loading" class="wme-app-knowledge-panel-spinner">
      <n-spin size="large"/>
    </div>
    <n-card :title="structuredContent.name" v-if="structuredContent && !loading">
      <template v-if="structuredContent.image" #cover>
        <n-image :src="structuredContent.image.content_url" object-fit="cover" class="wme-app-knowledge-panel-image"/>
      </template>
      <b class="wme-app-knowledge-panel-short-description"><i>{{ structuredContent.description }}</i></b>
      <knowledge-panel-section-selector v-if="structuredContent?.article_sections && structuredContent?.article_sections.length > 1" :sections="sections" @on-section-selected="onSectionSelected"/>
      <knowledge-panel-abstract v-if="sectionIndex == 0 && structuredContent.abstract" :abstract="structuredContent.abstract" :url="structuredContent.url || ''" :abstract-text-size="defaultSectionTextSize"/>
      <knowledge-panel-section v-if="sectionIndex != 0 && activeSection" :section="activeSection" :url="structuredContent.url || ''" :section-text-size="defaultSectionTextSize"/>
      <knowledge-panel-fact v-for="fact in facts" v-bind:key="fact.name" :name="fact.name || ''" :value="fact.value || ''" />
      <template #footer>
        <knowledge-panel-icon-link :url="structuredContent.url || ''" text="Wikipedia"/>
      </template>
    </n-card>
  </div>
</template>

<style>
.wme-app-knowledge-panel {
  width: 475px;
  margin-bottom: 20px;
}

@media only screen and (max-width: 600px) {
  .wme-app-knowledge-panel {
    width: 340px;
  }
}

.wme-app-knowledge-panel-image {
  width: 100%;
  min-height: 250px;
  max-height: 350px;
}

.wme-app-knowledge-panel-image img {
  object-position: 50% 0;
}

.wme-app-knowledge-panel .n-card__footer {
  display: flex;
  justify-content: flex-end;
}

.wme-app-knowledge-panel .n-card__footer a:visited, .wme-app-knowledge-panel .n-card__footer a {
  color: white !important;
  text-decoration: none;
}

.wme-app-knowledge-panel-spinner {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
