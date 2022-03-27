import request from '@/utils/request2'

/*
 *@description:获取本月总搜索次数
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getShearchCountInThisMonth(data) {
  return request({
    url: '/shearchCountMonth/thisMonth/count',
    method: 'get',
    data
  })
}

/*
 *@description:获取总搜索次数
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getShearchCount(data) {
  return request({
    url: '/shearchCount/count',
    method: 'get',
    data
  })
}

/*
 *@description:获取本月热搜前十
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getTenHotShearchInThisMonth(data) {
  return request({
    url: '/shearchCountMonth/thisMonth',
    method: 'get',
    data
  })
}

/*
 *@description:获取热搜前十
 *@author: zhuangweilong
 *@date:
 *@version: V1.0.0
*/
export function getTenHotShearch(data) {
  return request({
    url: '/shearchCount',
    method: 'get',
    data
  })
}
