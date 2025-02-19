<script lang="ts" setup>
import { ref } from 'vue';
import DragShadowRoot from './DragShadowRoot.vue';
import SimpleTabsContainer from '../container/SimpleTabsContainer.vue';
import ReadabilityDebug from './ReadabilityDebug.vue';
import VercelAICoreDebug from './VercelAICoreDebug.vue';
import MessageDebug from './MessageDebug.vue';
import StorageDebug from './StorageDebug.vue';
import { useRoute,useRouter } from 'vue-router';
import { ErrorMessage } from 'vee-validate';
import SummaryHeaderDebug from './SummaryBoxDebug.vue';
import ShadcnThemeColorVisual from './ShadcnThemeColorVisual.vue';
import CustomSelectDebug from './CustomSelectDebug.vue';
import ConnectMessageDebug from './ConnectMessageDebug.vue';
import ResizableDebug from './ResizableDebug.vue';
import SeparationComponentInContentDebug from './SeparationComponentInContentDebug.vue';
const { query: { index } } = useRoute()
const {replace}=useRouter()
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
    :initial-tab="Number(index)??0" 
    @tab-change="(i)=>replace({query:{index:i}})"
    class="pure-css p-4 bg-gray-100">
    <template v-for="(t) in components" v-slot:[t.__name]>
      <!-- {{ t.__name }} -->

      <component :is="t" />
    </template>
  </SimpleTabsContainer>

</template>

<style scoped></style>
