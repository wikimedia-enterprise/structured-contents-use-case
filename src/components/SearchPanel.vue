<script setup lang="ts">
import { NAutoComplete, NButton, NForm, NIcon } from 'naive-ui'
import { Search16Filled } from '@vicons/fluent'
import { ref, inject } from 'vue'
import { type IWMF } from '@/libraries/wmf'

defineProps({
  name: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:name'])
const wmf = inject('wmf') as IWMF
const options = ref(new Array<string>())
const loading = ref(false)
const inputValue = ref('')
async function onSubmit(event: Event) {
  event.preventDefault()
  emit('update:name', inputValue.value)
}
function getShow () {
  if (inputValue.value.length > 0) {
    loading.value = true

    wmf.getSuggestions(inputValue.value).then((suggestions) => {
      options.value = suggestions[1]
      loading.value = false
    })
  }
  
  return true
}
</script>

<template>
  <div class="wme-app-search">
    <n-form class="wme-app-search-form" :on-submit="onSubmit">
      <n-auto-complete
        placeholder="Start typing to search..."
        class="wme-app-search-input"
        :options="options"
        :loading="loading"
        :get-show="getShow"
        v-model:value="inputValue"
      >
        <template #prefix>
          <n-icon :size="16" :component="Search16Filled" />
        </template>
      </n-auto-complete>
      <n-button class="wme-app-search-button" attr-type="submit">Search</n-button>
    </n-form>
  </div>
</template>

<style>
.wme-app-search-form, .wme-app-search {
  display: flex;
  width: 475px;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .wme-app-search-form, .wme-app-search {
    width: 340px;
  }
}

.wme-app-search-input {
  width: 100%;
}

.wme-app-search-button {
  margin-left: 5px;
}
</style>
