import request from '@/utils/request2'

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
 *@description:获取一级评论
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
