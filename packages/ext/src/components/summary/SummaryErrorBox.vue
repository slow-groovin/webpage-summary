<template>
  <div class="overflow-auto relative max-h-64">
    <Button variant="github" size="sm-icon" class="absolute top-0 left-0" @click="copyToClipboard">
      <CopyIcon/>
    </Button>

    <pre>{{ error }}</pre>
  </div>
</template>
<script setup lang="ts">
import {Button} from '@/src/components/ui/button'
import { CopyIcon } from 'lucide-vue-next';
import { defineProps } from 'vue';

const props = defineProps<{
  error: Error;
}>();

const copyToClipboard = () => {
  navigator.clipboard.writeText(JSON.stringify(props.error,null,2)).then(() => {
    alert('Error message copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
};
</script>

<style scoped>
</style>