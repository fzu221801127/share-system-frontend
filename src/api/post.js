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
 *@description:举报资源
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function tipOffPost(data) {
  return request({
    url: '/posts/tipOffPost',
    method: 'put',
    data
  })
}

/*
 *@description:恢复被下架的资源
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function reinstatePostById(data) {
  return request({
    url: '/posts/id',
    method: 'put',
    data
  })
}

/*
 *@description:获取资源列表
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getPostPageList(currentPage, pagesize) {
  return request({
    url: '/posts',
    method: 'get',
    params: { currentPage, pagesize }
  })
}

/*
 *@description:获取下架的资源列表
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getPostTakeDownList(date) {
  return request({
    url: '/posts/takedown',
    method: 'get',
    date
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
 *@description:根据标题模糊查询暂时下架资源，并返回查询到的资源列表
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function searchTakedownPostByTitle(title) {
  return request({
    url: '/posts/takedown/title',
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
