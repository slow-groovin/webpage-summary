<script lang="ts" setup>
import { ref } from 'vue';
// import DragShadowRoot from './DragShadowRoot.vue';
import SimpleTabsContainer from '../container/SimpleTabsContainer.vue';
import ReadabilityDebug from './ReadabilityDebug.vue';
import VercelAICoreDebug from './VercelAICoreDebug.vue';
import MessageDebug from './MessageDebug.vue';
import StorageDebug from './StorageDebug.vue';


const components = [
  ReadabilityDebug,
  // DragShadowRoot,
  VercelAICoreDebug, MessageDebug, StorageDebug
]
</script>

<template>

  <SimpleTabsContainer :tabs="components.map(t => ({ name: t.__name ?? '', label: t.__name ?? '' }))"
    class="pure-css p-4 bg-gray-100">
    <template v-for="(t) in components" v-slot:[t.__name]>
      <component :is="t" />
    </template>
  </SimpleTabsContainer>

</template>

<style scoped></style>
