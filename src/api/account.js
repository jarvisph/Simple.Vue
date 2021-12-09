import request from '@/utils/request'

// 登录成功获取用户信息
export function getInfo() {
  return request({
    url: 'merchant/account/info',
    method: 'post'
  })
}
// 登录
export function login(data) {
  const formData = new FormData()
  for (var item in data) {
    if (data[item] === undefined || data[item] === null) continue
    formData.append(item, data[item])
  }
  return request({
    url: 'merchant/account/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: formData
  })
}
// 退出
export function logout() {
  return request({
    url: 'merchant/account/logout',
    method: 'post'
  })
}
// 初始化系统配置
export function getConfig() {
  return request({
    url: 'merchant/config/init',
    method: 'post'
  })
}
