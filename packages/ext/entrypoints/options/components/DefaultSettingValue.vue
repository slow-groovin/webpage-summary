<script lang="ts" setup>
defineProps<{
  value?: any
}>()
</script>
<template>
  <div class="text-xs font-extralight bg-neutral-500/30 rounded px-1">
    DEFAULT:&nbsp;
    <span class="font-mono font-light">
      {{ value }}
    </span>
  </div>

</template>