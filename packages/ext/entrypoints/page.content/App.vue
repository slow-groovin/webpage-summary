<!-- content entry, as a router -->
<script lang="ts" setup>
// import ContentDebugPanelEntry from '@/src/components/debug/ContentDebugPanelEntry.vue'
import { onMessage, sendMessage } from '@/messaging'
import RightFloatingBallContainer from '@/src/components/container/RightFloatingBallContainer.vue'
import HoverCard from '@/src/components/custom-ui/HoverCard.vue'
import SeparationComponentInContentDebug from '@/src/components/debug/SeparationComponentInContentDebug.vue'
import Summary from '@/src/components/summary/Summary.vue'
import { toast } from '@/src/components/ui/toast'
import Toaster from '@/src/components/ui/toast/Toaster.vue'
import { getEnableAutoBeginSummary, getEnableSummaryWindowDefault, useEnableFloatingBall } from '@/src/composables/general-config'
import { useEnableOnceAndToggleHide } from '@/src/composables/switch-control'
import { watchOnce } from '@vueuse/core'
import { sleep, sum } from 'radash'
import { onMounted, ref, useTemplateRef } from 'vue'
import icon from '~/assets/16.png'

onMounted(() => {

})



const { tryEnableOrShow, isEnable: isOpenSummaryPanel, isShow, toggleShow } = useEnableOnceAndToggleHide()
const { enableFloatingBall } = useEnableFloatingBall()
const isFloatingBallPulseAnim = ref(false)
const isOpenDebugPanel = ref(false)
const summaryRef = useTemplateRef('summaryRef')


async function openDebugPanel() {
  isOpenDebugPanel.value = !isOpenDebugPanel.value
}

async function toggleShowWrap() {
  toggleShow()
  isFloatingBallPulseAnim.value = true
  await sleep(1500)
  isFloatingBallPulseAnim.value = false
}
getEnableSummaryWindowDefault().then(v => {
  isOpenSummaryPanel.value = v
})

// trigger by popup/contextMenu, directly begin summary
onMessage('invokeSummary', () => {
  console.debug('[invokeSummary]')
  tryEnableOrShow() //open panel
  //invoke begin summary //todo: add a extra contextMenu
  // if (summaryRef.value) { 
  //   summaryRef.value.refreshSummary()
  // } else {//maybe the summary page not prepared when initailly
  //   watchOnce(summaryRef, () => {
  //     summaryRef.value!.on('onPrepareDone', () => {
  //       summaryRef.value!.refreshSummary()
  //     })
  //   })

  // }

})



</script>

<template>
  <div class="relative z-[9999] user-setting-style">

    <Toaster class="top-0 left-1/2" />

    <Summary v-if="isOpenSummaryPanel" v-show="isShow" ref="summaryRef" @minimize-panel="toggleShowWrap"
      class="h-fit top-[--webpage-summary-panel-top] bottom-[--webpage-summary-panel-bottom] left-[--webpage-summary-panel-left] right-[--webpage-summary-panel-right]" />

    <RightFloatingBallContainer v-if="enableFloatingBall" class="" :init-closed-btn-hidden="false"
      :storage-key="'page'">
      <HoverCard position="left" alignment="middle">
        <div @click="tryEnableOrShow" :class="{ 'animate-bounce duration-500': isFloatingBallPulseAnim }"
          class="w-fit h-fit p-1 aspect-square rounded-full border-[1px] border-purple-700">
          <img :src="icon" class="w-6 h-6 rounded select-none" draggable="false">
        </div>
        <template #custom-content>
          <div class="absolute right-12 top-0 rounded p-1 text-nowrap bg-neutral-700 text-white"> open summary panel
          </div>
        </template>
      </HoverCard>
    </RightFloatingBallContainer>

  </div>
</template>

<style scoped></style>
