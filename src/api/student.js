import request from '@/utils/request2'

/*
 *@description:insert一个学生
 *@author: zhuangweilong
 *@date: 2021-08-20 10:22:57
 *@version: V1.0.0
*/
export function insertStudent(data) {
  return request({
    url: '/students',
    method: 'post',
    data
  })
}

/*
 *@description:通过ID删除学生
 *@author: zhuangweilong
 *@date: 2021-08-20 11:27:47
 *@version: V1.0.0
*/
export function deleteStudentById(id) {
  return request({
    url: '/students/id',
    method: 'delete',
    params: { id }
  })
}

/*
 *@description:根据学生消息更新学生
 *@author: zhuangweilong
 *@date: 2021-08-20 14:48:19
 *@version: V1.0.0
*/
export function updateStudent(data) {
  return request({
    url: '/students/id',
    method: 'put',
    data
  })
}

/*
 *@description:获取学生列表
 *@author: zhuangweilong
 *@date: 2021-08-19 16:57:27
 *@version: V1.0.0
*/
export function getStudentList(data) {
  return request({
    url: '/students',
    method: 'get',
    data
  })
}

/*
 *@description:根据姓名查询学生，并返回查询到的学生列表
 *@author: 庄威龙
 *@date: 2021-08-19 16:57:50
 *@version: V1.0.0
*/
export function searchStudentByName(name) {
  return request({
    url: '/students/name',
    method: 'get',
    params: { name }
  })
}
