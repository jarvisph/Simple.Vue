import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import defaultSettings from '@/settings'
import {
  getToken
} from './utils/global'
NProgress.configure({
  showSpinner: false
})
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 进度条加载
  NProgress.start()
  // 设置页面标题
  document.title = defaultSettings.title + (to.meta.title === undefined ? '' : '-') + (to.meta.title || '')
  var hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.UserName) {
        next()
      } else {
        try {
          // 获取会员信息
          var user = await store.dispatch('user/getInfo')
          // 动态挂载路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', user.Menus)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 无序token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
