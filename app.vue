<script setup lang="ts">
import { provideHooksContext } from './lib/hooks';
provideHooksContext({
  endpoint: `/api/model`,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
