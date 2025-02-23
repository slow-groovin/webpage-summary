<template>
  <div :class="cn('flex flex-col ', clazz)">
    <!-- Welcome message -->
    <h1
      class="text-2xl font-bold mb-4 w-fit bg-gradient-to-r bg-clip-text text-transparent from-purple-500 via-blue-600 to-pink-500">
      {{ t('Welcome_Title') }} {{ name }}</h1>
    <!-- Introduction -->
    <p class="text-gray-600 mb-8 text-base">
      {{ t('Welcome_Intro') }}
    </p>

    <!-- Buttons -->
    <div class="flex space-x-4" v-if="isError1 || isError2">
      <a href="https://github.com/slow-groovin/webpage-summary/blob/dev/README.md" target="_blank">
        <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          {{ t('image_error_hint') }}
        </button>
      </a>
    </div>

    <h3>{{ t('create_new_model_config') }}</h3>
    <StatefulImage v-model:is-error="isError1" :timeout="5000"
      src="https://github.com/slow-groovin/webpage-summary/raw/refs/heads/dev/docs/img/create-model-anim.webp"
      class="object-contain w-fit" />
    <h3>{{ t('open_webpage_click_sum') }}</h3>
    <StatefulImage v-model:is-error="isError2"  :timeout="5000"
      src="https://raw.githubusercontent.com/slow-groovin/webpage-summary/refs/heads/dev/docs/img/summary-anim.webp"
      class="object-contain w-fit" />
  </div>
</template>

<script setup lang="ts">
/**
 * @fileOverview
 * Prompt: Generate a user-friendly welcome and introduction page for first-time users of the extension.
 *
 * This component serves as a welcome page for new users, providing a brief introduction to the extension's features and guiding them through the initial setup process.
 */
import { useExtInfo } from "@/src/composables/extension";
import { cn } from "@/src/utils/shadcn";
import { useTitle } from "@vueuse/core";
import { HTMLAttributes, ref } from "vue";
import { t } from "@/src/utils/extension";
import StatefulImage from "@/src/components/common/LoadingImage.vue";

const { class: clazz } = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { name } = useExtInfo()
const isError1 = ref<boolean>()
const isError2 = ref<boolean>()

useTitle('Welcome to use ' + name + '!')
</script>
<style lang="postcss" scoped>
h3 {
  @apply text-xl font-bold mb-1 mt-4;
}
</style>
