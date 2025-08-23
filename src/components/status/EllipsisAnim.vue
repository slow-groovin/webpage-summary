<template>
  <div>
    <p>{{ ellipsis }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const ellipsis = ref('.');


watchEffect(() => {
  let counter = 0;
  setInterval(() => {
    counter = (counter + 1) % 3; // 控制计数器从0到2循环
    if (counter === 0) {
      ellipsis.value = '.';
    } else if (counter === 1) {
      ellipsis.value = '..';
    } else {
      ellipsis.value = '...';
    }
  }, 500); // 每500ms改变一次
});
</script>
<style lang="scss" scoped>
</style>