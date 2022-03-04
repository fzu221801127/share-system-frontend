import request from '@/utils/request2'

/*
 *@description:根据id删除资源
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function deletePostById(id) {
  return request({
    url: '/posts/id',
    method: 'delete',
    params: { id }
  })
}

/*
 *@description:获取资源列表
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getPostList(data) {
  return request({
    url: '/posts',
    method: 'get',
    data
  })
}

/*
 *@description:根据标题模糊查询资源，并返回查询到的资源列表
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function searchPostByTitle(title) {
  return request({
    url: '/posts/title',
    method: 'get',
    params: { title }
  })
}

/*
 *@description:根据id查询资源，并返回查询到的资源
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function getPostById(id) {
  return request({
    url: '/posts/id',
    method: 'get',
    params: { id }
  })
}
