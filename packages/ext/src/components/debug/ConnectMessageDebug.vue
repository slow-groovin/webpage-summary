<script setup lang="ts">
import { sendConnectMessage } from '@/connect-messaging';
import { ref } from 'vue';
const r1=ref('')
const r2=ref('')
const r3=ref("")
async function sendMessage() {
  const result = await sendConnectMessage('func1', { p1: 'p1_val', p2: 22, p3: false })
  // result.value.content.then(c=> resultContent.value=c)
  r1.value=result.r1
  result.r2.then(_r=>r2.value=_r)
  result.r3.onChunk((c)=>{
    r3.value+=c
  })
  
}
</script>
<template>
  <button @click="sendMessage">sendMsg</button>
  <div>
    r1: {{r1}}<br>
    r2: {{r2}}<br>
    r3: {{r3}}<br>
  </div>
</template>