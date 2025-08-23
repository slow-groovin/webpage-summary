<script lang="ts" setup>
import { RouterView } from 'vue-router';
import Toaster from '@/src/components/ui/toast/Toaster.vue'
import { useTitle } from '@vueuse/core';
useTitle('Options')
</script>

<template>
  <RouterView/>
  <Toaster />
</template>

<style scoped>
</style>
