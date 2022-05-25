import request from '@/utils/request'
import qs from 'query-string'
export function upload(url, data) {
  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
export function form(url, data, method = 'post') {
  return request({
    url: url,
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    data: qs.stringify(data)
  })
}
