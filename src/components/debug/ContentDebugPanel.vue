<script lang="ts" setup>
import { ref } from 'vue';
import DragShadowRoot from './DragShadowRoot.vue';
import SimpleTabsContainer from '../container/SimpleTabsContainer.vue';
import DraggableContainer from '../container/DraggableContainer.vue';


const count = ref(0);
</script>

<template>
  <DraggableContainer class="min-w-[50em] min-h-[20em] bg-white top-[20%] right-[10%] border border-t-0 ">
    <template #header>
      <div class="h-8 bg-blue-400 w-full">
      </div>
    </template>
    <template #default>
      <SimpleTabsContainer :tabs="[{ label: 'Dragable', name: 'Dragable' }, { label: '2', name: '2' }]">
        <template #Dragable>
          <DragShadowRoot />
        </template>
        <template #2>
          <div>2</div>
        </template>

      </SimpleTabsContainer>
    </template>

  </DraggableContainer>

</template>

<style scoped></style>
