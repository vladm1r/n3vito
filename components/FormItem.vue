<template>
  <div class="form-item">
    <span class="p-float-label">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

</script>

<style>

</style>
