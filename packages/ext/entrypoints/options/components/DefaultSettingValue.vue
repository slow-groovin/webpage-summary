<script lang="ts" setup>
defineProps<{
  value?: any
}>()
</script>
<template>
  <div class="text-xs font-extralight bg-neutral-500/20 rounded px-1">
    DEFAULT:
    <span class="font-mono font-light">
       {{ value }}
    </span>
  </div>

</template>