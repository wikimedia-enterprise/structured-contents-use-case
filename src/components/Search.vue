<script setup lang="ts">
import { NAutoComplete, NButton, NForm, NIcon } from 'naive-ui'
import { Search16Filled } from '@vicons/fluent'
</script>

<template>
  <div class="wme-app-search">
    <n-form class="wme-app-search-form">
      <n-auto-complete
        placeholder="Start typing to search..."
        class="wme-app-search-input"
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
.wme-app-search-form {
  display: flex;
  align-items: center;
}

.wme-app-search-input {
  width: 400px;
}

.wme-app-search-button {
  margin-left: 5px;
}
</style>
