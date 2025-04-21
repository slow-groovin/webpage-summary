<template>
  <input type="text" v-model="url">
  <button @click="doFetch('get')">get</button>
  <button @click="doFetch('post')">post</button>
</template>
<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';

const url = useLocalStorage('debug-fetch-url', '')
async function doFetch(method: 'get' | 'post') {
  const res = await fetch(url.value, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',

    }
  }
  )
  console.log('res', res)

}
</script>