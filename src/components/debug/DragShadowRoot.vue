<script lang="ts" setup>
import DraggableContainer from '../container/DraggableContainer.vue';



</script>

<template>
  <DraggableContainer class="w-[30em] top-[20%] right-[10%] border border-t-0 ">
    <template #header>
      <div class="h-8 bg-neutral-400 w-full" >
      </div>
    </template>
    <template #default>
      <div class="">

        <div class="">
          <h1>Drag shadow root sample</h1>


        </div>

      </div>

    </template>

  </DraggableContainer>
</template>

<style scoped></style>
