<script setup lang="ts">
import Input from '@/src/components/ui/input/Input.vue';
import Switch from '@/src/components/ui/switch/Switch.vue';
import { useEnableAutoBeginSummary, useEnableFloatingBall, useEnablePopupClickTrigger, useEnableSummaryWindowDefault, useEnableTokenUsageView, useEnableUserChatDefault, useSummaryInputExceedBehaviour, useSummaryLanguage, useUserCustomStyle } from '@/src/composables/general-config';
import { DefaultConfig } from '@/src/constants/default-config';
import DefaultSettingValue from '../components/DefaultSettingValue.vue';

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
  <h1 class="text-2xl mb-4">General Setting</h1>
  <div class="mr-auto flex flex-col gap-8 items-stretch">
    <!-- SAMPLE -->
    <!-- <div class="line">
      <div>
        <div class="title">CONFIG ITEM</div>
        <div class="description">DESCRIPTION</div>
      </div>
      <div>
        <div class="w-6 h-6 bg-red-100"></div>
      </div>
    </div>


    <div class="line">
      <div>
        <div class="title">CONFIG ITEM 2</div>
        <div class="description">DESCRIPTION 123456789000000000000000000000</div>
      </div>
      <div>
        <div class="w-16 h-6 bg-red-100"></div>
      </div>
    </div> -->

    <div class="line">
      <div>
        <div class="title">Language of summary </div>
        <div class="description">select the language of the summary that you want to read</div>
      </div>
      <div class="setting">
        <Input v-model="summaryLanguage" />
        <DefaultSettingValue :value="DefaultConfig.SUMMARY_LANG" />
      </div>
    </div>

    <!-- Interaction -->
    <h2 class="font-bold text-2xl border-b ">
      Interaction
    </h2>
    <div class="line">
      <div>
        <div class="title">Enable floating ball</div>
        <div class="description">enable floating ball on the webpage</div>
      </div>
      <div class="setting">
        <Switch v-model:checked="enableFloatingBall" />
        <DefaultSettingValue :value="DefaultConfig.ENABLE_FLOATING_BALL" />
      </div>
    </div>


    <div class="line">
      <div>
        <div class="title">Auto begin summary</div>
        <div class="description">Auto begin summarizing once openning the summary window </div>
      </div>
      <div class="setting">
        <Switch v-model:checked="enableAutoBeginSummary" />
        <DefaultSettingValue :value="DefaultConfig.ENABLE_AUTO_BEGIN_SUMMARY" />
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Auto open summary panel on new tab</div>
        <div class="description">always open summary panel when you openning a new page</div>
        <blockquote class="border-l-4 border-l-orange-500 pl-2 bg-neutral-400/20 italic">warning: this might cause you
          inconvenience </blockquote>
      </div>
      <div class="setting">
        <Switch v-model:checked="enableSummaryWindowDefault" />
        <DefaultSettingValue :value="DefaultConfig.ENABLE_SUMMARY_WINDOW_DEFAULT" />
      </div>
    </div>





    <div class="line">
      <div>
        <div class="title">Enable popup click trigger</div>
        <div class="description"> change popup (extension icon in the left-top of browser) behaviour to opening the
          summary panel</div>
        <div class="description"> by default, it will open a popup panel</div>
      </div>
      <div class="setting">
        <Switch v-model:checked="enablePopupClickTrigger" />
        <DefaultSettingValue :value="DefaultConfig.ENABLE_POPUP_CLICK_TRIGGER" />
      </div>
    </div>


    <div class="line">
      <div>
        <div class="title">Always expand the chat box</div>
        <div class="description">chat box(for user to ask llm after summary with summary context) in
          the bottom of the summary window</div>
      </div>
      <div class="setting">
        <Switch v-model:checked="enableUserChatDefault" />
        <DefaultSettingValue :value="DefaultConfig.ENABLE_USER_CHAT_DEFAULT" />
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Enable token usage view</div>
        <div class="description">show token usage information in summary panel header</div>
      </div>
      <div class="setting">
        <Switch v-model:checked="enableTokenUsageView" />
        <DefaultSettingValue :value="DefaultConfig.ENABLE_TOKAN_USAGE_VIEW" />
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