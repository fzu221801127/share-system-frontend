import request from '@/utils/request2'

export function login(data) {
  return request({
    url: 'users/adminLogin',
    method: 'post',
    data
  })
}
