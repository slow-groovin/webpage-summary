<script setup lang="ts">
import Input from '@/src/components/ui/input/Input.vue';
import Switch from '@/src/components/ui/switch/Switch.vue';
import { useEnableAutoBeginSummary, useEnableFloatingBall, useEnablePopupClickTrigger, useEnableSummaryWindowDefault, useEnableTokenUsageView, useEnableUserChatDefault, useSummaryInputExceedBehaviour, useSummaryLanguage, useUserCustomStyle } from '@/src/composables/general-config';
import { DefaultConfig } from '@/src/constants/default-config';
import DefaultSettingValue from '../components/DefaultSettingValue.vue';
import { contentLengthExceededStrategys } from '@/src/presets/strategy';
import Select from '@/src/components/custom-ui/select/Select.vue';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { t } from '@/src/utils/extension';
import { CircleCheckBig, CircleCheckBigIcon } from 'lucide-vue-next';


const { summaryLanguage } = useSummaryLanguage()
const { enableAutoBeginSummary } = useEnableAutoBeginSummary()
const { enableSummaryWindowDefault } = useEnableSummaryWindowDefault()
const { enableFloatingBall } = useEnableFloatingBall()
const { enablePopupClickTrigger } = useEnablePopupClickTrigger()
const { enableTokenUsageView } = useEnableTokenUsageView()
const { enableUserChatDefault } = useEnableUserChatDefault()
const { summaryInputExceedBehaviour } = useSummaryInputExceedBehaviour()
const { userCustomStyle } = useUserCustomStyle()



</script>
<template>
  <h1 class="text-2xl mb-2">{{ t('Page_Extraction') }}</h1>
  <p class="description">extract text content from webpage as input of summary</p>



  <div class="mb-4" />


  <div class="mr-auto flex flex-col gap-8 items-stretch">

    <!-- description -->
    <p class="border-l-8 border-l-blue-400 italic pl-2 p-1 bg-neutral-500/10">
      Currently, only @mozilla/readability is provided as the extract method.
      If you think of some great ways, please provide feedback.
    </p>


    <div class="line mt-[-2em]">
      <div>
        <div class="title">{{t('Extract_method')}}</div>
                 <p class="description">how to get text content from .html file </p>
      </div>
      <div>
        <!-- just decoration -->
        <Select>
          <template #trigger>
            @mozilla/readability
          </template>

        </Select>
      </div>

    </div>

    <div class="line border rounded-xl p-2">
      <div>
        <div class="title">{{t('Length_exceeding_behaviour')}}
         
        
        </div>
        <p class="description">what to do when webpage content length exceeds the maxContentLength of model's config</p>
        <p class="description text-amber-600">feel free to set, you can also adjust context window on the spot when bad response received.</p>

        <Tabs v-model="summaryInputExceedBehaviour">
          <TabsList class="gap-4 p-4 bg-gray-300 items-stretch">
            <TabsTrigger value="cut-preserve-front" class="border">
              <img src="../../../assets/svg/cut-preserve-front-intro.svg" />
            </TabsTrigger>

            <TabsTrigger value="cut-preserve-end" class="border">
              <img src="../../../assets/svg/cut-preserve-end-intro.svg" />
            </TabsTrigger>

            <TabsTrigger value="cut-preserve-middle" class="border ">
                <img src="../../../assets/svg/cut-preserve-middle-intro.svg" class="" />
            </TabsTrigger>

            <TabsTrigger value="nothing" class="border ">
              Nothing
            </TabsTrigger>

          </TabsList>
        </Tabs>

        <div class="my-4 flex items-center gap-2 text-nowrap">
          <CircleCheckBigIcon class="text-green-500" />

          <div
            class="border rounded p-1 w-48  hover:cursor-pointer active:outline-1 select-none shadow font-mono font-bold">
            {{ contentLengthExceededStrategys[summaryInputExceedBehaviour]?.name }}
          </div>
          <div> {{ t((summaryInputExceedBehaviour.replaceAll('-','_')+'_DESC') as any )}}</div>
        </div>
        <DefaultSettingValue value="cut-preserve-front" class="w-fit"/>


      </div>




    </div>

  </div>



</template>
<style lang="postcss" scoped>
.title {
  @apply text-lg;
}

.description {
  @apply italic text-base font-light;
}

.line {
  @apply flex justify-between items-center gap-8 border-b border-b-transparent hover:border-b-border;
}

.setting {
  @apply flex flex-col items-end gap-0.5;
}
</style>