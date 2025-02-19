<template>
  <h1>Separation Component in content debug</h1>
  <div ref="debugRef" class="debugRef" id="debugRef">
    <Button @click="callToast">callToast</Button>
    <HoverCard :close-delay="10000" v-if="debugRefByDocument">
      <HoverCardTrigger>
        <Button>
          Hover me ❌
        </Button>
      </HoverCardTrigger>
      <HoverCardPortal v-if="debugRefByDocument" :to="debugRefByDocument" :disabled="!debugRefByDocument" force-mount>
        <!-- <HoverCardPortal v-if="debugRef" :to="debugRef"> -->
        <HoverCardContent class="bg-white border">
          Hover Content
        </HoverCardContent>
      </HoverCardPortal>

    </HoverCard>

    <Popover>
      <PopoverTrigger>
        <Button>popover❌</Button>

      </PopoverTrigger>
      <Teleport v-if="debugRefByDocument" :to="debugRefByDocument">
        <PopoverContent>
          <div>3frewf</div>
        </PopoverContent>
      </Teleport>
    </Popover>

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button>
            TooltipTrigger❌
          </Button>
        </TooltipTrigger>
        <TooltipContent>tolltip content</TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <div class="border p-2 my-2">
      <h2>teleport test</h2>
      <div>
        <div class="flex flex-col">
          <Teleport v-if="debugRef" :to="debugRef">
            <div>BE TELEPORTED TO debugRef</div>
          </Teleport>
          <Teleport v-if="debugRefByDocument" :to="debugRefByDocument">
            <div>BE TELEPORTED TO debugRefByDocument</div>
          </Teleport>
          <Teleport v-if="debugRefByDocument" to=".debugRef">
            <div>BE TELEPORTED TO '.debugRef'</div>
          </Teleport>
          <Teleport to="body">
            <div class="fixed top-[50vh] left-0">BE TELEPORTED TO 'body'</div>
          </Teleport>
        </div>
      </div>
    </div>

    <div class="flex flex-row ">
      <CustomHoverCard>
        <template #trigger>
          <Button>CustomHoverCard</Button>
        </template>
        <template #content>
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              Card Content
            </CardContent>
            <CardFooter>
              Card Footer
            </CardFooter>
          </Card>
        </template>
      </CustomHoverCard>

      <CustomHoverCard>
        <template #trigger>
          <CircleAlertIcon/>
        </template>
        <template #content>
          <pre>1.a
2.b
3.c            
          </pre>
        </template>
      </CustomHoverCard>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          Card Content
        </CardContent>
        <CardFooter>
          Card Footer
        </CardFooter>
      </Card>


    </div>
  </div>


  <Toaster />

</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from '../ui/button/Button.vue';
import HoverCard from '../ui/hover-card/HoverCard.vue';
import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';
import Popover from '../ui/popover/Popover.vue';
import PopoverContent from '../ui/popover/PopoverContent.vue';
import PopoverTrigger from '../ui/popover/PopoverTrigger.vue';
import { toast } from '../ui/toast';
import Toaster from '../ui/toast/Toaster.vue';
import { HoverCardPortal } from 'radix-vue';
import { Card, CardTitle, CardContent, CardDescription, CardHeader } from '../ui/card'
import Tooltip from '../ui/tooltip/Tooltip.vue';

import TooltipTrigger from '../ui/tooltip/TooltipTrigger.vue';
import TooltipContent from '../ui/tooltip/TooltipContent.vue';
import TooltipProvider from '../ui/tooltip/TooltipProvider.vue';

import CustomHoverCard from '../custom-ui/HoverCard.vue'
import { CircleAlertIcon } from 'lucide-vue-next';
const debugRef = ref<HTMLElement | null>()
const debugRefByDocument = ref<HTMLElement>()
tryQueryShadowElement()
onMounted(() => {
  tryQueryShadowElement()
})
console.log('debugRef.value', debugRef.value)
function tryQueryShadowElement() {
  console.log("-".repeat(100))
  console.log('debugRef.value', debugRef.value)
  console.log("document.querySelector('webpage-summary')", document.querySelector('webpage-summary'))
  console.log("document.querySelector('webpage-summary')?.shadowRoot", document.querySelector('webpage-summary')?.shadowRoot)
  console.log("document.querySelector('webpage-summary')?.shadowRoot?.getElementById('debugRef')", document.querySelector('webpage-summary')?.shadowRoot?.getElementById('debugRef'))
  console.log("-".repeat(100))
  debugRefByDocument.value = document.querySelector('webpage-summary')?.shadowRoot?.getElementById('debugRef') as HTMLElement

}
function callToast() {
  toast({ title: "toast" })
}

</script>