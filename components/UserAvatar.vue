<template>
  <el-avatar :src="props.src" fit="cover" />
</template>

<script setup lang="ts">
export interface Props {
  src?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '/img/avatar-default.png'
})
</script>
