<script setup lang="ts">
import { icons } from '../icons.js'
withDefaults(defineProps<{ name: string; size?: number | string; stroke?: number | string }>(), { size: 18, stroke: 1.8 })
</script>

<template>
  <svg
    class="rw-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  ><path :d="(icons as Record<string, string>)[name]" /></svg>
</template>

<style scoped>
.rw-icon { flex-shrink: 0; display: block; }
</style>
