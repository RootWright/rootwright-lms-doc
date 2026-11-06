<script setup lang="ts">
import { site } from '../data/site'
</script>

<template>
  <a class="rw-nav-cta" :href="site.cta.link">{{ site.cta.text }}</a>
</template>

<style scoped>
.rw-nav-cta {
  display: none; align-items: center; height: 40px; padding: 0 16px; margin-left: 16px;
  border-radius: var(--rw-r-btn); background: var(--vp-button-brand-bg); color: var(--vp-button-brand-text);
  font-size: 15px; font-weight: 600; white-space: nowrap; transition: background-color .15s;
}
.rw-nav-cta:hover { background: var(--vp-button-brand-hover-bg); }
@media (min-width: 1100px) { .rw-nav-cta { display: inline-flex; } }
</style>
