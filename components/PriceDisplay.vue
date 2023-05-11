<template>
  <p>{{ formattedValue }}</p>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: number
}>()

const formattedValue = computed<string>(() => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(props.value)
})
</script>
