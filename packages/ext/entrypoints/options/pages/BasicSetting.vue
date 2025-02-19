<script setup lang="ts">
import Select from '@/src/components/custom-ui/select/Select.vue';
import SelectItem from '@/src/components/custom-ui/select/SelectItem.vue';
import Input from '@/src/components/ui/input/Input.vue';
import Switch from '@/src/components/ui/switch/Switch.vue';
import { useSpokenLanguage, useEnableAutoBeginSummary, useEnableSummaryWindowDefault, useEnableTokenUsageView, useEnableUserChatDefault, useGeneralConfig, useMaxLength, useSummaryInputExceedBehaviour, useUserCustomStyle } from '@/src/composables/general-config';
import { browser } from 'wxt/browser';

const { spokenLanguage } = useSpokenLanguage()
const {enableAutoBeginSummary}=useEnableAutoBeginSummary()
const {enableSummaryWindowDefault}=useEnableSummaryWindowDefault()
const {enableTokenUsageView}=useEnableTokenUsageView()
const {enableUserChatDefault}=useEnableUserChatDefault()
const {maxLength}=useMaxLength()
const {summaryInputExceedBehaviour}=useSummaryInputExceedBehaviour()
const {userCustomStyle}=useUserCustomStyle()



</script>
<template>
  <h1 class="text-2xl mb-4">Basic Setting</h1>
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
        <div class="title">Language of the output summary</div>
        <div class="description">select the language of the summary that you want to read</div>
      </div>
      <div>
        <Input v-model="spokenLanguage" />
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Summary input content length exceed behaviour</div>
        <div class="description">what to do when the input(content of webpage) length exceed the model limit</div>
      </div>
      <div>
        <Select>
          <template #trigger v-model="summaryInputExceedBehaviour">
            {{ summaryInputExceedBehaviour }}
          </template>
          <template #content>
            <SelectItem value="clip" title="Split the content, discard the behind part to meet the maximum length requirement">clip</SelectItem>
          </template>
        </Select>
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Auto begin summary</div>
        <div class="description">Auto begin to summary after openning the summary window </div>
      </div>
      <div>
        <Switch v-model:checked="enableAutoBeginSummary"/>
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Always open summary window</div>
        <div class="description">always open summary window on a new webpage</div>
      </div>
      <div>
        <Switch v-model:checked="enableSummaryWindowDefault"/>
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Always open chat box</div>
        <div class="description">always open chat box(for user to ask llm after summary with summary context) in the bottom of the summary window</div>
      </div>
      <div>
        <Switch v-model:checked="enableUserChatDefault"/>
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Enable token usage view</div>
        <div class="description">show token usage information in summary window header</div>
      </div>
      <div>
        <Switch v-model:checked="enableTokenUsageView"/>
      </div>
    </div>

    <div class="line">
      <div>
        <div class="title">Custom css variables</div>
        <div class="description">custom css settings to modify the style  </div>
      </div>
      <div>
        <textarea v-model="userCustomStyle" class="border min-h-32 w-64 resize" placeholder="css variables... example:  --webpage-summary-user-float-window-width: 50rem;">

        </textarea>
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
  @apply flex justify-between items-center gap-8;
}
</style>