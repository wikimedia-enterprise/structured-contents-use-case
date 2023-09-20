<script setup lang="ts">
import { NCard, NImage, NTag, NIcon } from 'naive-ui'
import { Link48Regular } from '@vicons/fluent'
import { computed, defineProps } from 'vue'
import { type StructuredContent } from './../lib/wme'

const props = defineProps({
  structuredContent: {
    type: Object as () => StructuredContent | null,
    default: null
  }
})
const facts = computed(() => {
  if (!props.structuredContent?.infobox) return []

  const infoBox = props.structuredContent.infobox[0]

  if (!infoBox.has_parts) return []

  const sections = infoBox.has_parts.map(section => section.has_parts || []).flat()

  if (!sections) return []

  return sections.filter(part => part.type == 'field' && part.name && part.value).slice(0, 5)
})
const abstractSize = 395
const abstract = computed(() => {
  if (!props.structuredContent?.abstract) return ''

  return props?.structuredContent?.abstract?.length > abstractSize ? 
    `${props?.structuredContent?.abstract?.slice(0, abstractSize - 1)}...` : props?.structuredContent?.abstract
})
</script>

<template>
  <div class="wme-app-knowledge-panel" v-if="props.structuredContent">
    <n-card :title="props.structuredContent.name">
      <template v-if="props.structuredContent.image" #cover>
        <n-image :src="props.structuredContent.image.content_url" object-fit="cover" class="wme-app-knowledge-panel-image"/>
      </template>
      <p class="wme-app-knowledge-panel-abstract" >{{ abstract }}</p>
      <p v-for="fact in facts" class="wme-app-knowledge-panel-fact" v-bind:key="fact.name">
        <i class="wme-app-knowledge-panel-fact-name">{{ fact.name?.endsWith(':') ? fact.name : `${fact.name}:` }}</i>
        <b class="wme-app-knowledge-panel-fact-value">{{ fact.value }}</b>
      </p>
      <template #footer>
        <n-tag round>
          <a :href="props.structuredContent.url" target="_blank">Wikipedia</a>
          <template #icon>
            <n-icon :component="Link48Regular" />
          </template>
        </n-tag>
      </template>
    </n-card>
  </div>
</template>

<style>
.wme-app-knowledge-panel {
  width: 475px;
  margin-bottom: 20px;
}

.wme-app-knowledge-panel-fact-name {
  margin-right: 5px;
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
</style>
