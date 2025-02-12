import { createMemoryHistory, createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Summary from '@/src/pages/Summary.vue'
import Debug from '@/src/components/debug/ContentDebugPanel.vue'
import ModelProviderSetting from './pages/ModelProviderSetting.vue'
import PageReadSetting from './pages/PageReadSetting.vue'
import TriggerSetting from './pages/TriggerSetting.vue'
import PromptsSetting from './pages/PromptsSetting.vue'
import PromptCreate from './components/prompt-setting/PromptEditOrCreate.vue'

export const settingRoutes: (RouteRecordRaw & { name: string, icon: string })[] = [
  { path: '/models', component: ModelProviderSetting, name: 'model provider', icon: '' },
  { path: '/page', component: PageReadSetting, name: 'page', icon: '' },
  { path: '/trigger', component: TriggerSetting, name: 'trigger', icon: '' },
]

const otherRoutes: RouteRecordRaw[] = [
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/models', component: ModelProviderSetting },
    { path: '/pages', component: PageReadSetting },
    { path: '/trigger', component: TriggerSetting },

    {
      path: '/prompts',
      component: PromptsSetting,
      children:[
        {path:'/',component:PromptCreate},
        {path:'create',component:PromptCreate},
        {path:'edit',component:PromptsSetting},
      ]
    },

    { path: '/', component: PageReadSetting },
    { path: '/p1', component: PageReadSetting },
    { path: '/p2', component: PageReadSetting },
    { path: '/p3', component: PageReadSetting },
    { path: '/p4', component: PageReadSetting },
    { path: '/p5', component: PageReadSetting },
    { path: '/about', component: PageReadSetting },
  ]
})