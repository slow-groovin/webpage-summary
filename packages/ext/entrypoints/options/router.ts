import { createMemoryHistory, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Summary from '@/src/pages/Summary.vue'
import PageReadSetting from './pages/PageReadSetting.vue'
import TriggerSetting from './pages/TriggerSetting.vue'
import PromptsSetting from './pages/PromptsSetting.vue'
import PromptCreate from './components/prompt-setting/PromptCreate.vue'
import PromptList from './components/prompt-setting/PromptList.vue'
import OptionsLayout from './layout/OptionsLayout.vue'
import DebugPanelEntry from './pages/DebugPanelEntry.vue'
import PromptEdit from './components/prompt-setting/PromptEdit.vue'
import ModelConfigsSetting from './pages/ModelConfigsSetting.vue'
import ModelConfigsList from './components/model-setting/ModelConfigsList.vue'
import ModelConfigCreate from './components/model-setting/ModelConfigCreate.vue'
import ModelConfigsEdit from './components/model-setting/ModelConfigsEdit.vue'


export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: OptionsLayout,
      children: [
        { path: '/pages', component: PageReadSetting },
        { path: '/trigger', component: TriggerSetting },
        {
          path: '/models',
          component: ModelConfigsSetting,
          children: [
            { path: '', component: ModelConfigsList },
            { path: 'create', component: ModelConfigCreate },
            { path: 'edit', component: ModelConfigsEdit },
          ]
        },
        {
          path: '/prompts',
          component: PromptsSetting,
          children: [
            { path: '', component: PromptList },
            { path: 'create', component: PromptCreate },
            { path: 'edit', component: PromptEdit },
          ]
        },

        { path: '/', component: PageReadSetting },
        { path: '/debug', component: DebugPanelEntry },
        { path: '/p1', component: PageReadSetting },
        { path: '/p2', component: PageReadSetting },
        { path: '/p3', component: PageReadSetting },
        { path: '/p4', component: PageReadSetting },
        { path: '/p5', component: PageReadSetting },
        { path: '/about', component: PageReadSetting },

      ]
    }
  ]
})