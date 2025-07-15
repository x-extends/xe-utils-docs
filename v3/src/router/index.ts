import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import API from '../views/API.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'API'
    }
  },
  {
    path: '/',
    redirect: {
      name: 'API'
    }
  },
  {
    path: '/',
    name: 'API',
    component: API
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
