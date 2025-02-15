<template>
  <!-- Summary Dialog Component -->

  
  <div class="w-fit h-fit relative" ><!-- wrapper  -->
    <!-- top-right buttons -->
    <div class="absolute right-4 top-1  flex flex-row gap-1 z-[1000]">
      <Button variant="github" size="sm-icon">
        <CopyIcon />
      </Button>
    </div>

    <!-- dialog block -->
    <div class="border pt-2 pl-2 pr-8 pb-9 relative w-full min-h-32 max-h-[80vh] overflow-y-auto">
      <div id="dialog-anchor"></div>
      <slot></slot>
    </div>
    <GoTop class="absolute w-6 h-6 p-0 right-6 bottom-2" :top-anchor-id="'dialog-anchor'"/>
    <!-- bottom-right buttons -->
    <div class="absolute right-0 bottom-[-4] flex flex-row gap-1 ">
      <Button v-show="!isChatDialogOpen" @click="() => isChatDialogOpen = !isChatDialogOpen" variant="github"
        size="icon" class="rounded-none border-none text-gray-500">
        <MessageCirclePlusIcon />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CopyIcon, MessageCirclePlusIcon } from 'lucide-vue-next';
import Button from '../ui/button/Button.vue';
import GoTop from '../common/GoTop.vue';

const isChatDialogOpen = defineModel<boolean>('isChatDialogOpen', { default: false })
</script>

<style scoped>
pre code {
  border: 1px solid #1f1b1b;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}
</style>