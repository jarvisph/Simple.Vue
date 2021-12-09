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
    if (!route.ID) {
      return
    }
    // resolve => require([`@/views${route.Href}`], resolve)
    const tmp = {
      name: route.ID,
      path: route.Href || route.ID,
      alwaysShow: false,
      component: route.Href ? resolve => require.ensure([], () => resolve(require(`@/views${route.Href}`)), 'admin') : Layout,
      hidden: route.hidden || false,
      meta: {
        title: route.Name,
        icon: route.Icon,
        noCache: route.noCache || false
        // activeMenu: route.activeMenu
      }
    }
    if (route.menu) {
      tmp.children = filterAsyncRoutes(route.menu)
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
