<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import SimpleTabsContainer from '../container/SimpleTabsContainer.vue';
import ConnectMessageDebug from './ConnectMessageDebug.vue';
import CustomSelectDebug from './CustomSelectDebug.vue';
import MessageDebug from './MessageDebug.vue';
import ReadabilityDebug from './ReadabilityDebug.vue';
import ResizableDebug from './ResizableDebug.vue';
import ShadcnThemeColorVisual from './ShadcnThemeColorVisual.vue';
import StorageDebug from './StorageDebug.vue';
import SummaryHeaderDebug from './SummaryBoxDebug.vue';
import VercelAICoreDebug from './VercelAICoreDebug.vue';

const components = [
  ReadabilityDebug,
  // DragShadowRoot,
  VercelAICoreDebug,
  MessageDebug,
  StorageDebug,
  SummaryHeaderDebug,
  ShadcnThemeColorVisual,
  CustomSelectDebug,
  ConnectMessageDebug,
  ResizableDebug,
]
</script>

<template>

  <SimpleTabsContainer :tabs="components.map(t => ({ name: t.__name ?? '', label: t.__name ?? '' }))"
    class="pure-css p-4 bg-gray-100">
    <template v-for="(t) in components" v-slot:[t.__name]>
      <!-- {{ t.__name }} -->

      <component :is="t" />
    </template>
  </SimpleTabsContainer>

</template>
<style lang="postcss" scoped>

:deep(button) {
  @apply border border-blue-500 p-1 rounded-lg hover:bg-blue-300;
}
</style>
