import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import RouteLayout from '@/components/RouteLayout.vue'
import PageLayout from '@/components/PageLayout.vue'

import StartUtilInstall from '@/views/start/useUtil/install/CodeExample.vue'
import FreeDonation from '@/views/start/FreeDonation.vue'
import JoinSponsor from '@/views/start/JoinSponsor.vue'
import EnterprisePreview from '@/views/start/EnterprisePreview.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'StartUtilInstall'
    }
  },
  {
    path: '/',
    redirect: {
      name: 'StartUtilInstall'
    }
  },
  {
    path: '/start',
    component: PageLayout,
    children: [
      {
        path: 'useUtil',
        component: RouteLayout,
        children: [
          { path: 'install', name: 'StartUtilInstall', component: StartUtilInstall },
          { path: 'cdn', name: 'StartUtilCDN', component: () => import('@/views/start/useUtil/cdn/CodeExample.vue') }
        ]
      },
      {
        path: 'globalConfig',
        name: 'StartConfig',
        component: () => import('@/views/start/config/CodeExample.vue')
      },
      {
        path: 'freeDonation',
        name: 'FreeDonation',
        component: FreeDonation
      },
      {
        path: 'joinSponsor',
        name: 'JoinSponsor',
        component: JoinSponsor
      }
    ]
  },
  {
    path: '/enterprise',
    component: PageLayout,
    children: [
      {
        path: 'preview/:previewCode',
        name: 'EnterprisePreview',
        component: EnterprisePreview
      }
    ]
  },
  {
    path: '/',
    component: PageLayout,
    children: [
      {
        path: 'api/:name',
        name: 'DocsApi',
        component: () => import('@/views/api/UtilDocsApi.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
