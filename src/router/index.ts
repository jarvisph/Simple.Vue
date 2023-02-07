import { createRouter, createWebHistory } from 'vue-router'
import Layout from "../layout/index.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/redirect',
      component: Layout,
      children: [{
        path: '/redirect/:path*',
        component: () => import('../views/redirect/index.vue')
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: "/index",
      children: [
        {
          name: "home",
          path: "index",
          component: () => import('../views/index.vue')
        },
        {
          name: "user",
          path: "/user",
          component: () => import('../views/user/index.vue')
        },
        {
          name: "profile",
          path: "/profile",
          component: () => import('../views/profile/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
  ]
})
export default router
