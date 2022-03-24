import request from '@/utils/request2'

/*
 *@description:新增一级评论
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function insertFirstComment(data) {
  return request({
    url: '/firstComment',
    method: 'post',
    data
  })
}

/*
 *@description:新增二级评论
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function insertSecondComment(data) {
  return request({
    url: '/secondComment',
    method: 'post',
    data
  })
}

/*
 *@description:获取一级评论
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getFirstComments(postId) {
  return request({
    url: '/firstComment/postId',
    method: 'get',
    params: { postId }
  })
}

/*
 *@description:获取二级评论
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getSecondComments(firstCommentId) {
  return request({
    url: '/secondComment/firstCommentId',
    method: 'get',
    params: { firstCommentId }
  })
}
