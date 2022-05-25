import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * 注意: 子菜单仅在路由时出现 children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import(/* webpackChunkName: "index" */ '@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import(/* webpackChunkName: "index" */ '@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import(/* webpackChunkName: "index" */ '@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import(/* webpackChunkName: "index" */ '@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import(/* webpackChunkName: "index" */ '@/views/error-page/401'),
  hidden: true
},

{
  path: '/profile',
  component: Layout,
  redirect: '/profile/index',
  hidden: true,
  children: [{
    path: 'index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/profile/index'),
    name: 'Profile',
    meta: {
      title: '个人中心',
      noCache: true
    }
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import(/* webpackChunkName: "index" */ '@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: '主页',
      icon: 'am-icon-tachometer',
      affix: true
    }
  }]
},
{
  name: 'SignalR',
  path: '/signalr',
  alwaysShow: false,
  component: Layout,
  hidden: false,
  meta: {
    title: 'WebSocket',
    icon: ''
  },
  children: [{
    name: 'SignalR.Application',
    path: '/signalr/application',
    alwaysShow: false,
    component: () => import('@/views/signalr/application'),
    hidden: false,
    meta: {
      title: '应用程序',
      icon: ''
    }
  },
  {
    name: 'SignalR.Connection',
    path: '/signalr/connection',
    alwaysShow: false,
    component: () => import('@/views/signalr/connection'),
    hidden: false,
    meta: {
      title: '连接日志',
      icon: ''
    }
  },
  {
    name: 'SignalR.Push',
    path: '/signalr/push',
    alwaysShow: false,
    component: () => import('@/views/signalr/push'),
    hidden: false,
    meta: {
      title: '推送日志',
      icon: ''
    }
  }
  ]
},
{
  name: 'Translate',
  path: '/translate',
  alwaysShow: false,
  component: Layout,
  hidden: false,
  meta: {
    title: '翻译管理',
    icon: ''
  },
  children: [{
    name: 'Translate.Channel',
    path: '/translate/channel',
    alwaysShow: false,
    component: () => import('@/views/translate/channel'),
    hidden: false,
    meta: {
      title: '频道管理',
      icon: ''
    }
  },
  {
    name: 'Translate.Content',
    path: '/translate/content',
    alwaysShow: false,
    component: () => import('@/views/translate/content'),
    hidden: false,
    meta: {
      title: '翻译内容',
      icon: ''
    }
  }
  ]
}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
