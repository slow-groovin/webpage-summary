<script lang="ts" setup>
import { onMounted, ref } from 'vue';


import { sendMessage } from '@/messaging';
onMounted(async ()=>{
  const length = await sendMessage('getStringLength', 'hello world');

console.log(length); // 11

})

</script>

<template>
  

</template>

<style scoped></style>
