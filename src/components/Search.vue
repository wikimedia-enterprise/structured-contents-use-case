<script setup lang="ts">
import { NAutoComplete, NForm} from 'naive-ui'
</script>

<template>
  <div class="wme-app-search">
    <n-form>
      <n-auto-complete
        placeholder="Search"
        class="wme-app-search-input"
      />
    </n-form>
  </div>
</template>

<style>
.wme-app-search-input {
  width: 400px;
}
</style>
