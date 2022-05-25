import {
  constantRoutes
} from '@/router'
/* Layout */
import Layout from '@/layout'

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 */
export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (!route.Name) {
      return
    }
    const tmp = {
      name: route.Name,
      path: route.Meta.href || route.Name,
      alwaysShow: false,
      component: route.Meta.href ? resolve => require.ensure([], () => resolve(require(`@/views${route.Meta.href}`)), 'admin') : Layout,
      hidden: route.hidden || false,
      meta: {
        title: route.DisplayName,
        icon: route.icon,
        noCache: route.noCache || false
        // activeMenu: route.activeMenu
      }
    }
    if (route.Children) {
      tmp.children = filterAsyncRoutes(route.Children)
    }
    res.push(tmp)
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({
    commit
  }, menus) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(menus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
