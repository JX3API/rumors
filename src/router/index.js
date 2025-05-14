import { createRouter, createWebHistory } from 'vue-router'
import InformationMain from '@/views/Information/InformationMain.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InformationMain,
    },
  ],
})

export default router
