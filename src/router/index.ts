import { createRouter, createWebHistory } from 'vue-router'
import Layout from "../layout/index.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: "/index",
      children: [
        {
          name: "home",
          path: "index",
          component: () => import('../views/HomeView.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
