<!-- 
 provide a inject wrapper
  -->
<script setup lang="ts">
import { provide } from 'vue';

const {injectKey,injectValue}=defineProps<{
  injectKey:string,
  injectValue:string
}>()
provide(injectKey,injectValue)
</script>
<template>
  <slot/>
</template>