/**
 *@functionName: getNowTime
 *@description: 返回当前时间的字符串对象   格式:YYYY-mm-DD HH:mm:SS
 *@author: 庄威龙
 *@date:
 *@version: V1.0.0
*/
export function getNowTime() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var dataString = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  return dataString
}
