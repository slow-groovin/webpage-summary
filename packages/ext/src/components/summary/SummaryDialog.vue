<template>
  <!-- Summary Dialog Component -->

  <div class="relative border"><!-- wrapper  -->
    <!-- top-right buttons -->
    <div class="sticky  top-1 w-full flex justify-end pr-1 flex-row gap-1 z-10">
      <slot name="top-right-buttons" />

      <!-- copy btn -->
      <Button variant="github" size="sm-icon" @click="copyFunc?.()" title="copy all">
        <CopyIcon />
      </Button>


    </div>

    <!-- dialog block -->
    <div class="pt-2 pl-2 pr-8 pb-9 ">
      <div id="dialog-top-anchor"></div>

      <slot></slot>

    </div>
    <div class="sticky bottom-2  flex justify-end pr-1 flex-row gap-1">
      <div>
        <GoTop class="static w-6 h-6 p-0" :top-anchor-id="'dialog-top-anchor'" />

        <Button variant="github" size="sm-icon" class="rounded-full text-primary/50" @click="scrollBottomFunc?.()">
          <ArrowDownToLineIcon />
        </Button>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ArrowDownIcon, ArrowDownToLineIcon, CopyIcon } from 'lucide-vue-next';
import GoTop from '../common/GoTop.vue';
import Button from '../ui/button/Button.vue';
import { inject } from 'vue';

const copyFunc = inject<Function>('copy-func')
const scrollBottomFunc = inject<Function>('scroll-bottom')


</script>

<style scoped>
pre code {
  border: 1px solid #1f1b1b;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>