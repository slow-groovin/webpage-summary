import { createRouter, createWebHashHistory } from 'vue-router'

import ModelConfigCreate from './components/model-setting/ModelConfigCreate.vue'
import ModelConfigsEdit from './components/model-setting/ModelConfigsEdit.vue'
import ModelConfigsList from './components/model-setting/ModelConfigsList.vue'
import PromptCreate from './components/prompt-setting/PromptCreate.vue'
import PromptEdit from './components/prompt-setting/PromptEdit.vue'
import PromptList from './components/prompt-setting/PromptList.vue'
import OptionsLayout from './layout/OptionsLayout.vue'
import ModelConfigsSetting from './pages/ModelConfigsSetting.vue'
import PromptsSetting from './pages/PromptsSetting.vue'
import TriggerSetting from './pages/TriggerSetting.vue'
import GeneralSetting from './pages/GeneralSetting.vue'
import PageExtractionSettig from './pages/PageExtractionSettig.vue'
import AppearanceSetting from './pages/AppearanceSetting.vue'
import SiteCustomizationSetting from './pages/SiteCustomizationSetting.vue'


        
const debgRoute={ path: '/debug', component: ()=>import('@/src/components/debug/DebugPanel.vue') }
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: OptionsLayout,
      children: [
        { path: '/general', component: GeneralSetting },
        { path: '/page-extraction', component: PageExtractionSettig },
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

        { path: '/', component: GeneralSetting},
        debgRoute,
        { path: '/appearance', component: AppearanceSetting},
        { path: '/site-customization', component: SiteCustomizationSetting},
        { path: '/p2', component: GeneralSetting},
        { path: '/p1', component: GeneralSetting},
        { path: '/p4', component: GeneralSetting},
        { path: '/about', component: GeneralSetting},

      ]
    }
  ]
})