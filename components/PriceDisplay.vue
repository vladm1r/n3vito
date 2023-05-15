<template>
  <p>{{ formattedValue }}</p>
</template>

<script setup lang="ts">
import { currencyFormatter } from '../Lib/currencyFormatter'

const props = defineProps<{
  value: number
}>()

const formattedValue = computed<string>(() => {
  return currencyFormatter(props.value)
})
</script>
