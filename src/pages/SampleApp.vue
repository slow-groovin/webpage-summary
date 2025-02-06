<script lang="ts" setup>
import HelloWorld from '@/src/components/HelloWorld.vue';
</script>

<template>
  <div class="flex flex-col items-center w-fit rounded m-4 top-0 text-red-400 border-2 border-black">
    <div class="border">
      <a href="https://wxt.dev" target="_blank">
        <img src="@/public/wxt.svg" class="logo" alt="WXT logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <HelloWorld msg="WXT + Vue x" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #54bc4ae0);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
