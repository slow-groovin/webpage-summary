<script lang="ts" setup>
import { onMessage } from '@/messaging'
import RightFloatingBallContainer from '@/src/components/container/RightFloatingBallContainer.vue'
import HoverCard from '@/src/components/custom-ui/HoverCard.vue'
// import DebugPanelForContentScript from '@/src/components/debug/DebugPanelForContentScript.vue'
import Summary from '@/src/components/summary/Summary.vue'
import Toaster from '@/src/components/ui/toast/Toaster.vue'
import { getEnableAutoBeginSummaryByActionOrContextTrigger, getEnableSummaryWindowDefault, useEnableFloatingBall } from '@/src/composables/general-config'
import { useEnableOnceAndToggleHide } from '@/src/composables/switch-control'
import { watchOnce } from '@vueuse/core'
import { sleep } from 'radash'
import { ref, useTemplateRef } from 'vue'
import icon from '~/assets/16.png'

const { tryEnableOrShow, isEnable: isOpenSummaryPanel, isShow, toggleShow } = useEnableOnceAndToggleHide()
const { enableFloatingBall } = useEnableFloatingBall()
const isFloatingBallPulseAnim = ref(false)
const summaryRef = useTemplateRef('summaryRef')



async function toggleShowWrap() {
  toggleShow()
  isFloatingBallPulseAnim.value = true
  await sleep(1500)
  isFloatingBallPulseAnim.value = false
}

getEnableSummaryWindowDefault().then(v => {
  isOpenSummaryPanel.value = v
})

/**
 * try to begin summary, called  after confirming that the `Summary` component is not already, 
 */
function tryBeginSummary() {
  if (summaryRef.value) {
    if (summaryRef.value.status() === 'preparing') {
      console.debug('[invokeSummary]Summary preparing, hook begin summary on prepared done.')
      summaryRef.value.on('onPrepareDone', () => {
        summaryRef.value!.refreshSummary()
      })
    } else if (summaryRef.value.status() === 'ready') {
      console.debug('[invokeSummary]Summary Already prepared, directly begin summary.')
      summaryRef.value.refreshSummary()
    }
  } else {
    console.warn('[invokeSummary]Summary not mounted.')
  }
}

/**
 * trigger by popup/contextMenu, open the panel, and  begin summary depends on config `ENABLE_AUTO_BEGIN_SUMMARY_BY_ACTION_OR_CONTEXT_TRIGGER`
 *  
 * */
onMessage('invokeSummary', () => {
  console.debug('[invokeSummary]received message.')
  tryEnableOrShow() //open panel
  // invoke begin summary 
  getEnableAutoBeginSummaryByActionOrContextTrigger().then(enabled => {
    if (!enabled) return

    if (summaryRef.value) {
      tryBeginSummary()
    } else {//maybe the summary page not prepared when initailly
      console.debug('[invokeSummary]Summary not prepared, wait for prepare done.')
      watchOnce(summaryRef, () => {
        tryBeginSummary()
      })
    }
  })
})

/**
 * trigger by `add-to-chat` context menu button, add selection text to input dialog
 */
onMessage('addContentToChatDialog', (msg) => {
  const content = msg.data
  tryEnableOrShow() //open panel
  if (summaryRef.value) {
    summaryRef.value.addContentToChatDialog(content)
  } else {//maybe the summary page not prepared when initailly
    watchOnce(summaryRef, () => {
      sleep(500).then(() => {
        summaryRef.value!.addContentToChatDialog(content)
      })
    })
  }
})

</script>

<template>
  <div class="relative z-[99999] user-setting-style">

    <Toaster />

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


    <!-- <DebugPanelForContentScript class="fixed border-amber-200 bg-white max-w-[min(40rem,50vw)] top-0 left-0" /> -->
  </div>
</template>

<style scoped></style>
