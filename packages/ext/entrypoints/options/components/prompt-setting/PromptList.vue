<!-- show all prompts and main settings -->
<script setup lang="ts">
import Button from '@/src/components/ui/button/Button.vue';
import { usePromptConfigs, usePromptConfigStorage } from '@/src/composables/prompt';
import PromptConfigItemComponent from './PromptConfigItem.vue';
import { Edit, ArrowUpFromLine, ArrowDownFromLine, Delete, CircleX, LocateFixed } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { toast } from '@/src/components/ui/toast';
import { PromptConfigItem } from '@/src/types/config/prompt';
import RadioButton from '@/src/components/custom-ui/RadioButton.vue';

const { listItem, updateConfigOrder, setDefaultItemId, deleteItem, getDefaultItem } = usePromptConfigStorage()
const { state: prompts } = usePromptConfigs()
const { push } = useRouter()
const defaultPrompt = ref<PromptConfigItem | null>()

onMounted(async () => {
  defaultPrompt.value = await getDefaultItem()

})
const handleUp = (id: string) => {
  console.log(`Up button clicked for prompt with id ${id}`);
  updateConfigOrder(id, 'up')
};



const handleEdit = (id: string) => {
  console.log(`Edit button clicked for prompt with id ${id}`);
  push(`/prompts/edit?id=${id}`)
};

const handleDown = (id: string) => {
  console.log(`Down button clicked for prompt with id ${id}`);
  updateConfigOrder(id, 'down')
};

const handleDelete = async (id: string) => {
  console.log(`delete button clicked for prompt with id ${id}`);
  const result = await deleteItem(id)
  if (result) {
    toast({
      title: `delete suc!`,
      variant: 'success',

    })
  } else {
    toast({
      title: `delete failed!`,
      variant: 'destructive'

    })
  }
};

const handleSelect = async (id: string) => {
  console.log(`select button clicked for prompt with id ${id}`);
  const rs = await setDefaultItemId(id)
  if (!rs) {
    toast({
      title: 'select default config failed!',
      variant: 'destructive'
    })
    return
  }
  defaultPrompt.value = prompts.value.find(p => p.id === id)
}

const handleLocate = (id: string | undefined) => {
  if (id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};


</script>
<template>
  <div>
    <!-- create button -->
    <div>
      <RouterLink to="/prompts/create">
        <Button>create one</Button>
      </RouterLink>
    </div>
    <!-- default -->
    <div class="min-h-16 text-2xl mt-4 flex flex-row items-center gap-2">
      default:
      <span class="border rounded p-1 border-green-500">
        {{ defaultPrompt?.name }}

      </span>
      <LocateFixed @click="handleLocate(defaultPrompt?.id)" class="h-8 w-8 text-green-500 border rounded-2xl p-1 hover:border-green-800" />

    </div>
    <!-- list -->
    <div class="relative">
      <TransitionGroup name="list" tag="div" class="">
        <template v-for="prompt in prompts" :key="prompt.id">
          <div class="flex items-center gap-2 mb-4" :id="prompt.id">
            <RadioButton :checked="!!defaultPrompt && defaultPrompt.id === prompt.id" @click="handleSelect(prompt.id)" />
            <PromptConfigItemComponent :item="prompt" 
              :class="{ ' shadow-green-500 border-blue-500 ring-blue-500 bg-green-300/20 ring-2 shadow-2xl': !!defaultPrompt && defaultPrompt.id === prompt.id }" />
            <div class="flex flex-col justify-center gap-4">
              <Button @click="handleUp(prompt.id)">
                <ArrowUpFromLine />
              </Button>
              <Button @click="handleEdit(prompt.id)" variant="outline">
                <Edit ></Edit>
              </Button>
              <Button @click="handleDelete(prompt.id)" variant="destructive">
                <CircleX />
              </Button>
              <Button @click="handleDown(prompt.id)">
                <ArrowDownFromLine />
              </Button>
            </div>
          </div>
        </template>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
/* 对移动中的元素应用的过渡 */
.list-enter-active {
  transition: all 0.5 ease;
}

.list-move,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10em);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
  /* max-width: 100%; */
}
</style>
