import {
  getInfo,
  logout,
  login,
  getConfig
} from '@/api/account'
import {
  resetRouter
} from '@/router'

import {
  setToken,
  removeToken,
  setGlobal
} from '@/utils/global'

const state = {
  NickName: undefined,
  Face: undefined,
  UserName: undefined,
  Code: undefined,
  CreateAt: undefined,
  LoginAt: undefined,
  LoginIP: undefined,
  Token: undefined,
  GroupID: undefined
}

const mutations = {
  SET_USER: (state, info) => {
    state.NickName = info.NickName
    state.Face = info.Face || 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
    state.UserName = info.Name
    state.Code = info.Code
    state.RoleName = info.RoleName
    state.CreateAt = info.CreateAt
    state.LoginAt = info.LoginAt
    state.LoginIP = info.LoginIP
    state.GroupID = info.GroupID
    state.Menus = info.Menus
  },
  SET_TOKEN: (state, token) => {
    state.Token = token
  }
}

const actions = {
  // 登录
  login({
    commit
  }, dataForm) {
    return new Promise((resolve, reject) => {
      login(dataForm).then(res => {
        if (!res.success) {
          reject(res.msg)
        }
        setToken(res.info.Token)
        commit('SET_TOKEN', res.info.Token)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 初始化配置
  getConfig({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getConfig().then(res => {
        if (!res.success) {
          reject('初始化错误')
        }
        setGlobal(res.info)
        resolve(res.info)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户信息
  getInfo({
    commit
  }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (!res.success) {
          reject('验证失败，请重新登录')
        }
        commit('SET_USER', res.info)
        console.log(status)
        if (!document.getElementById('check-permission')) {
          const permissionStyle = res.info.Permission.map(item => `.permission[check-permission="${item}"]`).join(',') + '{display:block;}'
          const style = document.createElement('style')
          style.type = 'text/css'
          style.id = 'check-permission'
          style.innerText = permissionStyle
          document.head.appendChild(style)
        }
        resolve(res.info)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户退出
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        resetRouter()
        removeToken()
        commit('SET_USER', {})
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 移除Token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
