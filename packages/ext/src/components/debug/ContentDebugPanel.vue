<script lang="ts" setup>
import { ref } from 'vue';
import DragShadowRoot from './DragShadowRoot.vue';
import SimpleTabsContainer from '../container/SimpleTabsContainer.vue';
import DraggableContainer from '../container/DraggableContainer.vue';
import ReadabilityDebug from './ReadabilityDebug.vue';
import VercelAICoreDebug from './VercelAICoreDebug.vue';
import MessageDebug from './MessageDebug.vue';
import StorageDebug from './StorageDebug.vue';




const components = [
  DragShadowRoot,
  ReadabilityDebug, VercelAICoreDebug, MessageDebug, StorageDebug
]
</script>

<template>
  <DraggableContainer class="min-w-[50em] min-h-[20em] z-[1000] bg-white top-[20%] right-[10%] border border-t-0 ">
    <template #header>
      <div class="h-8 bg-blue-400 w-full">
      </div>
    </template>
    <template #default>
      <SimpleTabsContainer :tabs="components.map(t => ({ name: t.__name ?? '', label: t.__name ?? '' }))"
        class="p-4 bg-gray-100">
        <template v-for="(t) in components" v-slot:[t.__name]>
          <component :is="t" />
        </template>
      </SimpleTabsContainer>
    </template>

  </DraggableContainer>

</template>

<style scoped></style>
