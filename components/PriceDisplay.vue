<script setup lang="ts">
import { currencyFormatter } from '../lib/currencyFormatter'

const props = defineProps<{
  value: number
}>()

const formattedValue = computed<string>(() => {
  return currencyFormatter(props.value)
})
</script>

<template>
  <p>{{ formattedValue }}</p>
</template>
