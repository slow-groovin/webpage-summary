<script lang="ts" setup>
import { onMounted, ref } from 'vue';


import { sendMessage } from '@/messaging';
import { browser } from 'wxt/browser';
onMounted(async () => {
  
})
async function testGetStringLength() {
  const length = await sendMessage('getStringLength', 'hello world');
  console.log(length); // 11
  alert('getStringLength:'+length)
}

const connectMsg=ref<string[]>([])
async function testConnectAPI() {
  const port = browser.runtime.connect({ name: "knockknock" });
  port.postMessage({ joke: "Knock knock" });
  port.onMessage.addListener((_msg:unknown)=>{
    if(!_msg || typeof _msg!=='object'){
      return
    }
    const msg=_msg as any
    connectMsg.value.push(msg.question)
    if (msg.question === "Who's there?")
      port.postMessage({ answer: "Madame" });
    else if (msg.question === "Madame who?")
      port.postMessage({ answer: "Madame... Bovary" });
  });

}

</script>

<template>
<div>
  <button @click="testGetStringLength">testGetStringLength</button>
  <button @click="testConnectAPI">testConnectAPI</button>
  <div>
    {{ connectMsg }}
  </div>
</div>

</template>

<style scoped></style>
