import request from '@/utils/request2'

/*
 *@description:insert一个用户
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function insertUser(data) {
  return request({
    url: '/users',
    method: 'post',
    data
  })
}

/*
 *@description:通过ID删除用户
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function deleteUserById(id) {
  return request({
    url: '/users/id',
    method: 'delete',
    params: { id }
  })
}

/*
 *@description:根据用户信息更新用户
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function updateUser(data) {
  return request({
    url: '/users/id',
    method: 'put',
    data
  })
}

/*
 *@description:获取用户列表
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getUserList(data) {
  return request({
    url: '/users',
    method: 'get',
    data
  })
}

/*
 *@description:根据姓名查询用户，并返回查询到的用户列表
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function searchUserByName(name) {
  return request({
    url: '/users/name',
    method: 'get',
    params: { name }
  })
}

/*
 *@description:根据id查询用户，并返回查询到的用户
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function getUserById(id) {
  return request({
    url: '/users/id',
    method: 'get',
    params: { id }
  })
}

/*
 *@description:根据id模糊查询用户，并返回查询到的用户列表
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function searchUserById(id) {
  return request({
    url: '/users/idshearch',
    method: 'get',
    params: { id }
  })
}
