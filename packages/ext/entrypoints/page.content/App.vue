<!-- content entry, as a router -->
<script lang="ts" setup>
// import ContentDebugPanelEntry from '@/src/components/debug/ContentDebugPanelEntry.vue'
import { onMessage, sendMessage } from '@/messaging'
import RightFloatingBallContainer from '@/src/components/container/RightFloatingBallContainer.vue'
import HoverCard from '@/src/components/custom-ui/HoverCard.vue'
import Summary from '@/src/components/summary/Summary.vue'
import Toaster from '@/src/components/ui/toast/Toaster.vue'
import { getEnableAutoBeginSummary } from '@/src/composables/general-config'
import { useEnableOnceAndToggleHide } from '@/src/composables/switch-control'
import { sleep } from 'radash'
import { onMounted, ref } from 'vue'
import icon from '~/assets/16.png'

onMounted(() => {

})



const { tryEnableOrShow, isEnable: isOpenSummaryPanel, isShow, toggleShow } = useEnableOnceAndToggleHide()

const isFloatingBallPulseAnim = ref(false)
const isOpenDebugPanel = ref(false)



async function openDebugPanel() {
  isOpenDebugPanel.value = !isOpenDebugPanel.value
}

async function toggleShowWrap() {
  toggleShow()
  isFloatingBallPulseAnim.value = true
  await sleep(1500)
  isFloatingBallPulseAnim.value = false
}
getEnableAutoBeginSummary().then(v => {
  isOpenDebugPanel.value = v
})

onMessage('invokeSummary',()=>{
  console.debug('invoke summary by popup')
  tryEnableOrShow()
})



</script>

<template>
  <div class="relative z-[9999] user-setting-style">

    <Toaster />


    <Summary v-if="isOpenSummaryPanel" v-show="isShow" class="top-16 right-16" @minimize-panel="toggleShowWrap" />

    <RightFloatingBallContainer class="top-[70%]" :init-closed-btn-hidden="false">
      <HoverCard>
        <template #trigger>
          <div @click="tryEnableOrShow" :class="{ 'animate-bounce duration-500': isFloatingBallPulseAnim }"
            class="w-fit h-fit p-2 aspect-square rounded-full border-[1px] border-purple-800">
            <img :src="icon" class="w-6 h-6 rounded select-none" draggable="false">
          </div>
        </template>
        <template #content>
          open summary panel
        </template>
      </HoverCard>
    </RightFloatingBallContainer>
  </div>
</template>

<style scoped></style>
