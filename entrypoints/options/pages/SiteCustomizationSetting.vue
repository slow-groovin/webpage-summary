<script setup lang="ts">
import { useEnableAutoBeginSummary, useEnableFloatingBall, useEnablePopupClickTrigger, useEnableSummaryWindowDefault, useEnableTokenUsageView, useEnableUserChatDefault, useSummaryInputExceedBehaviour, useSummaryLanguage, useUserCustomStyle } from '@/src/composables/general-config';
import { t } from '@/src/utils/extension';

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
  <h1 class="text-2xl mb-4">{{ t('Site_Customization') }} {{ t('Setting') }}</h1>
  🚧🚧🚧NOT IMPLEMENTION 🚧🚧🚧
    

</template>
<style lang="postcss" scoped>
</style>