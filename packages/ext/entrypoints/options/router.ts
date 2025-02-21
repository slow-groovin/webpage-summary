import { createRouter, createWebHashHistory } from 'vue-router'

import ModelConfigCreate from './components/model-setting/ModelConfigCreate.vue'
import ModelConfigsEdit from './components/model-setting/ModelConfigsEdit.vue'
import ModelConfigsList from './components/model-setting/ModelConfigsList.vue'
import PromptCreate from './components/prompt-setting/PromptCreate.vue'
import PromptEdit from './components/prompt-setting/PromptEdit.vue'
import PromptList from './components/prompt-setting/PromptList.vue'
import OptionsLayout from './layout/OptionsLayout.vue'
import BasicSetting from './pages/BasicSetting.vue'
import ModelConfigsSetting from './pages/ModelConfigsSetting.vue'
import PromptsSetting from './pages/PromptsSetting.vue'
import TriggerSetting from './pages/TriggerSetting.vue'


        
const debgRoute={ path: '/debug', component: ()=>import('@/src/components/debug/DebugPanel.vue') }
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: OptionsLayout,
      children: [
        { path: '/basic', component: BasicSetting },
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

        { path: '/', component: BasicSetting},
        debgRoute,
        { path: '/p1', component: BasicSetting},
        { path: '/p2', component: BasicSetting},
        { path: '/p3', component: BasicSetting},
        { path: '/p4', component: BasicSetting},
        { path: '/p5', component: BasicSetting},
        { path: '/about', component: BasicSetting},

      ]
    }
  ]
})