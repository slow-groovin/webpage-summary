<template>

  <div
    :class="cn('flex items-center rounded-lg underline decoration-dashed text-nowrap text-xs font-light', clazz ?? '')">
    <!-- Word count -->

    <div title=" click the right eye button to View&Change">{{ t('input_length') }}:
      <span v-if="selectLength > maxLength" class="text-red-500" :title="`>${showNum(maxLength)}`">
        {{ showNum(selectLength) }}
      </span>
      <span v-else>
        {{ showNum(selectLength) }}
      </span>
    </div>

    <Button variant="ghost" size="sm-icon" @click="isViewContent = true">
      <ScanEyeIcon class="w-6 h-6 text-gray-500/70" />
    </Button>

    <div v-if="isViewContent"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-wrap border rounded p-2 bg-secondary    ">

      <!-- view header -->
      <div class="flex items-center gap-2 text-sm mb-2">
        <ExtIcon />
        <h1 class="font-bold text-xl"> Input Content View</h1>

        <!-- slide bar -->
        <div class="relative flex flex-col font-xs border p-2 pr-5 bg-white">
          <Slider v-model.lazy="sliderValue" :min="0" :max="length" class="w-32" />
          <div class="relative h-4 w-full">
            <div :style="{ left: (sliderValue[0] / length * 100) + '%' }" class="absolute">
              {{ showNum(sliderValue[0]) }}
            </div>
            <div :style="{ left: (sliderValue[1] / length * 100) + '%' }" class="absolute">
              {{ showNum(sliderValue[1]) }}
            </div>
          </div>
        </div>

        <span class="border p-1 rounded">
          <span class="font-semibold">Content Length: </span>
          <span class="text-green-700">
            input:{{ showNum(selectLength) }}/
          </span>
          <span class="">
            total:{{ showNum(length) }}/
          </span>
          <span class="text-red-500">
            max(limit):{{ showNum(maxContentLength) }}
          </span>
        </span>


        <span class="grow" />


        <Button @click="isViewContent = false" variant="github" size="icon">
          <Minimize2Icon @click="" />
        </Button>


      </div>

      <!-- view content -->
      <div class="relative max-w-[66vw] max-h-[66vh]  overflow-y-auto">
        <span class="">{{ webpagContent.textContent?.substring(0, sliderValue[0]) }}</span>
        <span class="text-green-500 underline">{{ webpagContent.textContent?.substring(sliderValue[0], sliderValue[1])
          }}</span>
        <span class="">{{ webpagContent.textContent?.substring(sliderValue[1]) }}</span>
      </div>
    </div>



  </div>
</template>

<script setup lang="ts">
import { getSummaryInputExceedBehaviour } from "@/src/composables/general-config";
import { contentLengthExceededStrategys } from "@/src/presets/strategy";
import { InputContentLengthExceededStrategy, SummaryInput, WebpageContent } from "@/src/types/summary";
import { cn } from "@/src/utils/shadcn";
import { random, sleep } from "radash";
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { HTMLAttributes } from 'vue';
import { Slider } from "../ui/slider";
import { EyeIcon, Minimize2Icon, MinimizeIcon, ScanEyeIcon } from "lucide-vue-next";
import ExtIcon from "../common/ExtIcon.vue";
import Button from "../ui/button/Button.vue";
import { browser } from "wxt/browser";
import { t } from "@/src/utils/extension";

defineOptions({
  inheritAttrs: false
})
const { webpagContent, maxContentLength, class: clazz } = defineProps<{
  webpagContent: WebpageContent,
  maxContentLength?: number,
  class?: HTMLAttributes['class']
}>()
const length = webpagContent.length ?? 0
const maxLength = maxContentLength ?? length

const isViewContent = ref(false)

const contentTrimmerFunction = defineModel<{ trim: (s: string) => string }>('content-trimmer')
const exceedBehaviour = ref<InputContentLengthExceededStrategy>()

const sliderValue = ref([0, length])
const selectLength = computed(() => sliderValue.value[1] - sliderValue.value[0])
const behaviourFunction = computed(() => {
  if (exceedBehaviour.value) {
    return contentLengthExceededStrategys[exceedBehaviour.value]['exec']
  }
  return contentLengthExceededStrategys['nothing']['exec']
})



onMounted(() => {


})

getSummaryInputExceedBehaviour().then(v => {
  exceedBehaviour.value = v
  const { start, end } = behaviourFunction.value(length, maxLength)
  sliderValue.value = [start, end]
  contentTrimmerFunction.value!.trim=(s: string) => {
      return s.slice(sliderValue.value[0], sliderValue.value[1])
    }
})


function showNum(num?: number) {

  if (!num || num < 1000) {
    return num
  } else {
    return Math.floor(num / 1000) + 'K'
  }
}




</script>