<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { storage } from 'wxt/storage';

import { sendMessage } from '@/messaging';
import { browser } from 'wxt/browser';
import { computedAsync } from '@vueuse/core';
import useWxtStorage from '@/src/composables/useWxtStorage';
const item = ref<any>()
const backgroundItem=ref<any>()
const allItems=ref<any>()
onMounted(async () => {
  // ✅ This is good
  item.value = await storage.getItem<number>('local:debug-item');
})

const defineItem=storage.defineItem<number>('local:debug-item')
const computeDefineItem=computedAsync(async ()=> await defineItem.getValue()) //❌ not a reactive value
const {state,isLoading,isReady}=useWxtStorage('local:debug-item',0)
async function setStorage() {
  await storage.setItem('local:debug-item', Date.now());
  console.log('[suc] setItem(local:debug-item)')
  
  //👇exception
  // await storage.setItem('session:debug-item', Date.now());
  // console.log('[suc] setItem(session:debug-item)')
  // await storage.setItem('sync:debug-item', Date.now());
  // console.log('[suc] setItem(sync:debug-item)')
  // await storage.setItem('managed:debug-item', Date.now());
  // console.log('[suc] setItem(managed:debug-item)')
}

async function getStorage() {
  const _item = await storage.getItem<number>('local:debug-item');
  item.value=_item
  console.log('[suc] getItem(local:debug-item)',_item); 
  
  //👇exception
  // const item2= await storage.getItem<number>('session:debug-item');
  // console.log('[suc] getItem(session:debug-item)',item2); 
  // const item3= await storage.getItem<number>('sync:debug-item');
  // console.log('[suc] getItem(sync:debug-item)',item3); 
  // const item4= await storage.getItem<number>('managed:debug-item');
  // console.log('[suc] getItem(managed:debug-item)',item4); 
}

async function getStorageFromBackground() {
  backgroundItem.value=await sendMessage('getGlobalConfig','debug-item')
}

async function getAllConfig(){
  const items=await browser.storage.local.get(null);
  allItems.value=items
}
</script>

<template>
  <div>
    item: {{  item }} 
  </div>
  <div> computeDefineItem: {{ computeDefineItem }} (❌not a reactive value)</div>
  <div> useWxtStorage.state: {{ state }}  isLoading: {{ isLoading }} isReady:{{ isReady }} (✔ reactive)</div>
  
  
  <div>
    backgroundItem: {{ backgroundItem }}
  </div>
 

  <blockquote>backgroundItem is equal to item, demonstrate: no need to send message to background</blockquote>
  <div>
    <button @click="setStorage">setStorage</button>
    <button @click="getStorage">getStorage</button>
    <button @click="getStorageFromBackground">getAllStorageFromBackground</button>
    <button @click="getAllConfig">getAllConfig</button>
  </div>
  <div>
    allItems: 
    <pre>{{ allItems }}</pre>
  </div>
</template>

<style scoped></style>
