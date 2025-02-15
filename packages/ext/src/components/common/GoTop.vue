<template>
  <Button
    variant="outline"
    :class="cn('fixed bottom-1 right-1 bg-background/50 shadow-lg rounded-full p-4 text-primary/50 hover:bg-background   hover:text-primary active:border-foreground/50 active:border', props.class)"
    @click="scrollToTop">
    <ArrowUpToLineIcon />
  </Button>
</template>

<script lang="ts" setup>
import { ArrowUpToLineIcon } from "lucide-vue-next";
import { scrollToId } from "@/src/utils/document";
import { HTMLAttributes } from "vue";
import { cn } from "@/src/utils/shadcn";
import Button from "../ui/button/Button.vue";

const props = defineProps<{
  topAnchorId?: string,
  class?: HTMLAttributes['class']
}>()



function scrollToTop() {
  scrollToId(props.topAnchorId ?? '__top_anchor')
}


</script>

<style scoped>
/* 可以根据需要添加自定义样式 */
</style>
