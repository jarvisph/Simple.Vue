import request from './request'
import {
  parseTime
} from './index'
const tokenKey = 'Token'

export function getToken() {
  return localStorage.getItem(tokenKey)
}
export function setToken(token) {
  return localStorage.setItem(tokenKey, token)
}
export function removeToken() {
  return localStorage.setItem(tokenKey, '')
}
export function getTokenKey() {
  return tokenKey
}
export function Language(language) {
  // 获取语言包
  if (!language) {
    language = localStorage.getItem('_LANGUAGE') || 'CHN'
    return language
  } else {
    localStorage.setItem('_LANGUAGE', language)
  }
}
export function setGlobal(data) {
  for (var item in data) {
    localStorage.setItem(item, JSON.stringify(data[item]))
  }
}
export function getGlobal(key) {
  return JSON.parse(localStorage.getItem(key))
}
export function getGlobals() {
  var data = {}
  for (var item in localStorage) {
    var value = localStorage[item]
    try {
      data[item] = JSON.parse(value)
    } catch {
      data[item] = value
    }
  }
  return data
}

export default {
  install(Vue) {
    let _sefr = null
    Vue.prototype.$init = function() {
      _sefr = this
    }
    Vue.prototype.$global = getGlobals()

    Vue.prototype.$get = function(url) {
      return request({
        url: url,
        method: 'get'
      })
    }
    Vue.prototype.$post = function(url, data) {
      return request({
        url: url,
        method: 'post',
        data
      })
    }
    Vue.prototype.$form = function(url, data, method = 'post') {
      const formData = new FormData()
      for (var item in data) {
        if (data[item] === undefined || data[item] === null) continue
        formData.append(item, data[item])
      }
      return request({
        url: url,
        method: method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        data: formData
      })
    }
    Vue.prototype.$delete = function(url) {
      return request({
        url: url,
        method: 'delete'
      })
    }
    Vue.prototype.$utils = {
      // 从胜率转化成为赔率
      odds: function(winRate, rebate, type) {
        var odds = rebate / winRate
        switch (type) {
          case 'HK':
            odds = odds - 1
            break
          case 'MY':
            odds = odds <= 2 ? odds - 1 : -1 / (odds - 1)
            break
          case 'IN':
            odds = odds >= 2 ? odds - 1 : -1 / (odds - 1)
            break
        }
        return Math.floor(odds * 10000) / 10000
      }
    }
    Vue.prototype.$htmlFunction = {
      datetime: function(date, fomat, icon = true) {
        if (!date) return 'N/A'
        var html = []
        if (icon) {
          html.push("<i class='el-icon-time'></i>")
        }
        if (fomat) {
          html.push('<span>' + parseTime(date, fomat) + '</span>')
        } else {
          html.push('<span> ' + parseTime(date, '{y}-{m}-{d} {h}:{i}') + '</span>')
        }
        return html.join(' ')
      },
      date: function(date) {
        return this.datetime(date, '{y}-{m}-{d}')
      },
      userStatus: function(status) {
        var html = []
        if (status === 'Disable') {
          html.push('<span class="el-text-red">')
          html.push('<i class="el-icon-delete"></i>')
          html.push('~删除~')
          html.push('</span>')
        } else if (status === 'Locking') {
          html.push('<span class=""el-text-yellow>')
          html.push('<i class="el-icon-lock"></i>')
          html.push('~锁定~')
          html.push('</span>')
        } else {
          html.push('<span class="el-text-green">')
          html.push('<i class="el-icon-check"></i>')
          html.push('~正常~')
          html.push('</span>')
        }
        return html.join('\n')
      },
      getImage: function(img) {
        return `<span class="el-avatar el-avatar--square" style="height: 40px; width: 40px; line-height: 40px;"><img src="${img}" style=""></span>`
      },
      getGame: function(gameId) {
        return `@<span>${this.getImage()}</span>`
      },
      bool: function(bool) {
        if (bool) {
          return "<span class='el-text-green'>~是~</span>"
        } else {
          return "<span class='el-text-red'>~否~</span>"
        }
      },
      over: function(value, condition) {
        if (value === 0) {
          return value
        }
        if (value > condition) {
          return `<span class='el-text-red'>${value}</span>`
        }
        if (value < condition) {
          return `<span class='el-text-green'>${value}</span>`
        }
      },
      money: function(value) {
        if (!value) return "<label class='el-text-black'>0.00</label>"
        var num = Number(value)
        if (isNaN(num)) return value
        if (num > 0) {
          return "<label class='el-text-green'>+" + this.number(value) + '</label>'
        } else if (num < 0) {
          return "<label class='el-text-red'>" + this.number(value) + '</label>'
        }
        return "<label class='el-text-black'>0.00</label>"
      },
      // 带三位分割的数字类型输出（保留两位小数）
      number: function(value, dec) {
        if (!value) return '0.00'
        var num = Number(value)
        if (isNaN(num)) return value
        if (dec === undefined) dec = 2
        var arr = []
        var decimal = Math.abs(num) % 1
        var negative = ''
        if (num < 0) {
          negative = '-'
        }
        var numString = Math.floor(Math.abs(num)).toString()
        var start = numString.length % 3
        if (start) arr.push(numString.substr(0, start))
        for (var i = 0; i < Math.floor(numString.length / 3); i++) {
          arr.push(numString.substr(i * 3 + start, 3))
        }
        return negative + arr.join(',') + (dec ? (Math.floor(decimal * Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec).substr(1) : '')
      },
      // / 设备类型
      platform: function(platform) {
        if (!platform || !platform.length) return ''
        var icon = []
        if (platform.indexOf('PC') !== -1) icon.push('am-icon-desktop')
        if (platform.indexOf('Windows') !== -1) icon.push('am-icon-windows')
        if (platform.indexOf('MAC') !== -1) icon.push('am-icon-safari')
        if (platform.indexOf('Mobile') !== -1) icon.push('am-icon-mobile')
        if (platform.indexOf('IOS') !== -1) icon.push('am-icon-apple')
        if (platform.indexOf('Android') !== -1) icon.push('am-icon-android')
        if (platform.indexOf('Wechat') !== -1) icon.push('am-icon-wechat')
        return icon.map(t => '<i class="' + t + '"></i>').join(' ')
      },
      // 订单状态
      orderStatus: function(status, name) {
        var icon = null
        var color = null
        switch (status) {
          case 'Wait':
            icon = 'am-icon-spinner am-icon-pulse'
            color = 'el-text-gray'
            name = '~等待开奖~'
            break
          case 'Finish':
            icon = 'am-icon-smile-o'
            color = 'el-text-green'
            name = '~已完成~'
            break
          case 'Pending':
            icon = ''
            color = 'el-text-red'
            name = '~等待收单~'
            break
          case 'Settlement':
            icon = 'am-icon-hand-lizard-o'
            name = '~结算中~'
            break
        }
        return "<span class='" + (color || '') + "'><i class='" + icon + "' style='margin-right:5px;'></i>" + name + '</span>'
      },
      // 输赢状态
      itemStatus: (status, name) => {
        var icon = null
        var color = null
        switch (status) {
          case 'None':
            name = '未开奖'
            break
          case 'Win':
            icon = 'am-icon-trophy'
            color = 'el-text-green'
            name = '~赢~'
            break
          case 'Lose':
            icon = 'am-icon-frown-o'
            color = 'el-text-red'
            name = '~输~'
            break
          case 'Revoke':
            icon = 'am-icon-history'
            color = 'el-text-gray'
            name = '~无效订单~'

            break
        }
        if (!name) return ''
        return "<span class='" + (color || '') + "'><i class='" + icon + "' style='margin-right:5px;'></i>" + name + '</span>'
      },
      // 通用的状态样式
      status: (type, status) => {
        if (!status) return 'N/A'
        var result = null
        var name = type[status]
        result = name
        var style = {
          color: '',
          icon: ''
        }
        // Stop: "停止", Normal: "正常", Maintain: "维护"
        switch (status) {
          case 'Normal':
          case 'Pass':
          case 'Open':
            style.color = 'green'
            style.icon = 'layui-icon layui-icon-ok-circle'
            break
          case 'Reject':
          case 'Close':
            style.color = 'red'
            style.icon = 'layui-icon layui-icon-close-fill'
            break
          case 'Stop':
            style.color = 'red'
            style.icon = 'am-icon-lock'
            break
          case 'Maintain':
            style.color = 'blue'
            style.icon = 'layui-icon layui-icon-util'
            break
          case 'Member':
            style.color = 'green'
            style.icon = 'layui-icon layui-icon-friends'
            break
          case 'Agent':
            style.color = 'green'
            style.icon = 'layui-icon layui-icon-group'
            break
          case 'IN':
            style.color = 'green'
            style.icon = 'am-icon-sign-in'
            break
          case 'OUT':
            style.color = 'blue'
            style.icon = 'am-icon-sign-out'
            break
          case 'Win':
          case 'WinHalf':
            style.color = 'green'
            style.icon = 'layui-icon layui-icon-face-smile'
            break
          case 'Loss':
          case 'Lose':
          case 'LossHalf':
            style.color = 'red'
            style.icon = 'layui-icon layui-icon-face-cry'
            break
          case 'Wait':
          case 'None':
            style.color = 'gray'
            style.icon = 'layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop'
            break
          case 'Settlement':
            style.color = 'blue'
            style.icon = 'layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop'
            break
          case 'Revoke':
          case 'Cancel':
          case 'Draw':
            style.color = 'black'
            style.icon = 'layui-icon layui-icon-face-surprised'
            break
          case 'PC':
            style.color = 'black'
            style.icon = 'am-icon-laptop'
            break
          case 'Mobile':
            style.color = 'black'
            style.icon = 'am-icon-mobile'
            break
          case 'Lock':
            style.color = 'red'
            style.icon = 'am-icon-lock'
            break
        }
        if (style.color && style.icon) {
          result = "<span class='el-text-" + style.color + "'><i class='" + style.icon + "'></i> " + name + '</span>'
        }
        return result
      },
      // 币种显示
      currency: function(currency) {
        return `${_sefr.$global.Enum['SP.StudioCore.Enums.Currency'][currency]}`
      },
      p: function(value) {
        var num = Number(value)
        if (isNaN(num)) return value
        return (num * 100).toFixed(2) + '%'
      }

    }
  }
}
