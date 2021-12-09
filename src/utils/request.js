import axios from 'axios'
import {
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  getTokenKey,
  Language
} from './global'
// 初始化axios
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // 请求前缀
  withCredentials: false, //  allow is Cookie
  timeout: 10000 // timeout
})

// request interceptors
service.interceptors.request.use(
  config => {
    var token = getToken()
    if (token) {
      var tokenKey = getTokenKey()
      config.headers[tokenKey] = token
      config.headers['Content-Language'] = Language()
    }
    return config
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptors
service.interceptors.response.use(
  response => {
    var res = response.data
    if (res.success) {
      return res
    } else {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 未登陆或token已过期、移除本地token、并刷新页面进入登录页面
      if (response.status === 401) {
        store.dispatch('user/resetToken').then(() => {
          location.reload() // href login page
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
