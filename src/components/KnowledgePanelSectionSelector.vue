<script setup lang="ts">
import { ChevronRight12Regular, ChevronLeft12Regular } from '@vicons/fluent'
import type { Part } from '@/libraries/wme'
import { NCarousel, NCarouselItem, NTag } from 'naive-ui'
import KnowledgePanelIconButton from '@/components/KnowledgePanelIconButton.vue';
import { ref } from 'vue'

const props = defineProps({
  sections: {
    type: Array<Part>,
    default: []
  }
})
const emit = defineEmits(['onSectionSelected'])
const carousel = ref(NCarousel || null)
const checked = ref([true])
function onCheckedChange(value: boolean, index: number) {
  if (value) {
    checked.value = checked.value.map(() => false)
    checked.value[index] = true
    emit('onSectionSelected', index, props.sections[index])
  }
}
</script>

<template>
  <div class="wme-app-knowledge-panel-section-selector">
    <n-carousel ref="carousel" :show-dots="false" :slides-per-view="'auto'" :space-between="1" :loop="false">
      <n-carousel-item 
        class="wme-app-knowledge-panel-section-selector-carousel-item" 
        v-for="(section, index) in sections" :key="section.name"
      >
        <n-tag @update:checked="(value) => onCheckedChange(value, index)" :checked="checked[index]"  border checkable  class="wme-app-knowledge-panel-section-selector-tag" round>
          {{ section.name }}
        </n-tag>
      </n-carousel-item>
    </n-carousel>
    <knowledge-panel-icon-button @click="carousel.prev()" :icon="ChevronLeft12Regular" class="wme-app-knowledge-panel-section-selector-carousel-prev"/>
    <knowledge-panel-icon-button @click="carousel.next()" :icon="ChevronRight12Regular" class="wme-app-knowledge-panel-section-selector-carousel-next"/>
  </div>
</template>

<style>
.wme-app-knowledge-panel-section-selector {
  margin-top: 12px;
  position: relative;
  padding: 0 8px;
}

.wme-app-knowledge-panel-section-selector-carousel-item {
  width: auto !important;
}

.wme-app-knowledge-panel-section-selector-tag:not(.n-tag--checked) {
  border: 1px solid rgba(255, 255, 255, 0.24)
}

.wme-app-knowledge-panel-section-selector-carousel-prev, .wme-app-knowledge-panel-section-selector-carousel-next {
  position: absolute;
  top: 0px;
}

.wme-app-knowledge-panel-section-selector-carousel-prev {
  left: -22px;
}

.wme-app-knowledge-panel-section-selector-carousel-next {
  right: -22px;
}
</style>
