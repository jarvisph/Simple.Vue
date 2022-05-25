import request from '@/utils/request'
import qs from 'query-string'
// 登录成功获取用户信息
export function getInfo() {
  return request({
    url: 'auth/account/info',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
// 登录
export function login(data) {
  return request({
    url: 'auth/account/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: qs.stringify(data)
  })
}
// 退出
export function logout() {
  return request({
    url: 'auth/account/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
// 初始化系统配置
export function getConfig() {
  return request({
    url: 'auth/config/init',
    method: 'post'
  })
}
