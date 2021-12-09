import request from '@/utils/request'

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
