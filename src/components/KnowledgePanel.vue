<script setup lang="ts">
import { NCard, NImage, NTag, NIcon, NSpin } from 'naive-ui'
import { Link48Regular } from '@vicons/fluent'
import { watch, ref, inject, computed } from 'vue'
import { type StructuredContent, type IWME } from '@/libraries/wme'
import { type Thing, type ISOCK } from '@/libraries/sock';

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})
const loading = ref(false)
const structuredContent = ref(null as null | StructuredContent)
const thing = ref(null as null | Thing)
const wme = inject('wme') as IWME
const sock = inject('sock') as ISOCK

watch(() => props.name, async (value) => {
  loading.value = true
  wme.accessToken = localStorage.getItem('access_token') || ''

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

  try {
    thing.value = await sock.getThing(value)
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
const abstractSize = 395
const abstract = computed(() => {
  if (!structuredContent.value?.abstract) return ''

  return structuredContent.value?.abstract?.length > abstractSize ? 
    `${structuredContent.value?.abstract?.slice(0, abstractSize - 1)}...` : structuredContent.value?.abstract
})
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
      <b><i>{{ structuredContent.description }}</i></b>
      <p class="wme-app-knowledge-panel-abstract" >{{ abstract }}</p>
      <p v-for="fact in facts" class="wme-app-knowledge-panel-fact" v-bind:key="fact.name">
        <i class="wme-app-knowledge-panel-fact-name">{{ fact.name?.endsWith(':') ? fact.name : `${fact.name}:` }}</i>
        <b class="wme-app-knowledge-panel-fact-value">{{ fact.value }}</b>
      </p>
      <template #footer>
        <n-tag round>
          <a :href="structuredContent.url" target="_blank">Wikipedia</a>
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

@media only screen and (max-width: 600px) {
  .wme-app-knowledge-panel {
    width: 340px;
  }
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

.wme-app-knowledge-panel-spinner {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
