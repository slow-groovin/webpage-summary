<template>
  <!-- Summary Dialog Component -->


  <div class="relative border"><!-- wrapper  -->
    <!-- top-right buttons -->
    <div class="sticky top-1  flex justify-end pr-1 flex-row gap-1">
      <!-- copy btn -->
      <Button variant="github" size="sm-icon">
        <CopyIcon />
      </Button>
    </div>

    <!-- dialog block -->
    <div class="pt-2 pl-2 pr-8 pb-9 mt-[-1.5rem]">
      <div id="dialog-top-anchor"></div>

      <slot id="dialog-bottom-anchor"></slot>
      <div id=""></div>

    </div>
    <div class="sticky bottom-2  flex justify-end pr-1 flex-row gap-1">

      <GoTop class="static w-6 h-6 p-0" :top-anchor-id="'dialog-top-anchor'" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { CopyIcon, MessageCirclePlusIcon } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
import GoTop from '../common/GoTop.vue';




</script>

<style scoped>
pre code {
  border: 1px solid #1f1b1b;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>