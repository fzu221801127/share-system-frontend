<!--
 * @description: 资源分享网-文章详情
 * @fileName: Detail.vue
 * @author: 庄威龙
 * @date: 2022-01-30 17:26:38
 * @后台人员:
 * @path:
 * @version: V1.0.0
!-->
<template>
  <div
    class="detail"
    style="background-color: #f3f3f3; position: absolute; top: 0; width: 100%"
  >
    <Header />
    <div class="main">
      <el-container style="background-color: white">
        <el-header style="font-size: 30px; height: 100%">
          <div
            style="
              padding-top: 20px;
              padding-bottom: 20px;
              word-wrap: break-word;
            "
          >
            {{ blog.title }}
          </div>
        </el-header>
        <hr>
        <el-container>
          <el-aside width="200px">
            <div style="padding-left: 20px; padding-top: 20px">
              <img
                :src="imgUrl"
                alt="头像"
                style="
                  width: 100px;
                  height: 100px;
                  margin: 0;
                  padding: 0;
                  line-height: 0;
                  position: relative;
                  left: 35px;
                "
              >
              <div
                style="
                  font-size: 22px;
                  width: 100%;
                  padding: 0;
                  margin: 0;
                  word-break: break-all;
                  white-space: normal;
                  line-height: 20px;
                  position: relative;
                  top: -70px;
                  text-align: center;
                "
              >
                {{ blog.userId }}
              </div>
            </div>
          </el-aside>
          <el-container>
            <el-main style="">
              <!--Markdown-->
              <div id="preview" />

              <!-- <div>{{ blog.content }}</div> -->
            </el-main>
            <el-footer height="120px">
              <div style="float: right">
                <!-- <el-button
                  round
                  style="background-color: #ff4949; color: white"
                  @click="thumb()"
                >{{ thumbname }}
                </el-button> -->
                <el-button
                  type="warning"
                  icon="el-icon-star-off"
                  circle
                  style="float:right"
                  @click="collection()"
                />
                <br>
                <span style="font-size: 15px;margin-right:10px">{{ blog.releaseTime }}</span>
                <el-button
                  type="text"
                  style="color: black"
                  @click="tipOff()"
                >举报</el-button>
              </div>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
      <div>
        <v-Comments :blog-id="getRequest().key" />
      </div>
      <br>
      <div>
        <v-CreateComment :blog-id="getRequest().key" />
      </div>
    </div>
  </div>
</template>

<script>
// import { url } from '@/utils/interface.js'
// import store from '@/store'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import CreateComment from '@/components/Comment/CreateComment'
import Comments from '@/components/Comment/Comments'
import { getPostById } from '@/api/post'

export default {
  name: 'Detail',
  components: {
    'v-CreateComment': CreateComment,
    'v-Comments': Comments
  },
  data() {
    const blog = {
      userId: 'zzzzzzzzzzzzzddddddggaggsagsgsdagsagsdwl',
      title: '尴尬的就不会更加快速改归谁啊噶啥更是个大傻瓜发士大夫干啥的哦i韩国i哦萨汗国干啥干啥给撒噶时光',
      content: '古u干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复沙山东ui哦好风水哦大会复干啥干啥韩国收到固沙山东ui哦好风水哦大会复',
      releaseTime: '2021-05-10 22:25:23',
      click: '5'
    }
    return {
      blog,
      // title: '',
      // content: '',
      // authorName: '',
      canthumb: true, // 是否可以点赞
      thumbname: '点赞',
      // avatar
      imgUrl: 'https://img0.baidu.com/it/u=3725297972,3236585201&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
    }
  },
  computed: {
  },
  created() {
    this.getBlogDetails()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    /**
     *@functionName:  collection
     *@description: 收藏
     *@author: 庄威龙
     *@date:
     *@version: V1.0.0
     */
    collection() {
      // collectBlog(this.getRequest().key).then((response) => {
      //   const { data } = response
      //   if (data.code == '200') {
      //     this.$message({
      //       message: '收藏成功！',
      //       type: 'success'
      //     })
      //   }
      // })
    },
    /**
     *@functionName:  thumb
     *@description: 点赞
     *@author: 庄威龙
     *@date:
     *@version: V1.0.0
     */
    thumb() {
      // const params = {
      //   blogId: this.getRequest().key,
      //   flag: this.canthumb
      // }
      // thumbBlog(params).then((response) => {
      //   const { data } = response
      //   if (data.code == '200' && this.canthumb === true) {
      //     this.$message({
      //       message: '点赞成功！',
      //       type: 'success'
      //     })
      //     this.canthumb = false
      //     this.thumbname = '已点赞'
      //   } else if (data.code == '200' && this.canthumb === false) {
      //     this.$message({
      //       message: '取消点赞成功！',
      //       type: 'success'
      //     })
      //     this.canthumb = true
      //     this.thumbname = '点赞'
      //   }
      // })
    },
    /**
     *@functionName:  tipOff
     *@description: 举报
     *@author: 庄威龙
     *@date:
     *@version: V1.0.0
     */
    tipOff() {
      // tipOffBlog(this.getRequest().key).then((response) => {
      //   const { data } = response
      //   if (data.code == '200') {
      //     this.$message({
      //       message: '举报成功！',
      //       type: 'success'
      //     })
      //   }
      // })
    },
    /**
     *@functionName:  getBlogDetails
     *@description: 获取文章详细信息   !!接口还没换 !!数据还是写死 需要到时候父子传参调整
     *@author: 庄威龙
     *@date:
     *@version: V1.0.0
     */
    getBlogDetails() {
      console.log('key=' + this.getRequest().key)
      getPostById(this.getRequest().key).then((response) => {
        console.log(response)
        this.blog = response
        this.renderMarkdown(this.blog.content)
      })
    },
    /**
     *@functionName:  getRequest
     *@description: 获取请求参数对象
     *               使用方法 getRequest().参数名
     *@author: 庄威龙
     *@date:
     *@version: V1.0.0
     */
    getRequest() {
      const url = location.href // 获取url中"?"符后的字串
      // console.log(location.href)
      // eslint-disable-next-line no-new-object
      var theRequest = new Object()
      // console.log(url.indexOf("?"))
      // eslint-disable-next-line eqeqeq
      if (url.indexOf('?') != -1) {
        var str = url.substr(url.indexOf('?') + 1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 50px;
  text-align: center;
}
.header {
  width: 85%;
  margin: auto;
  margin-top: 5%;
}
.main {
  margin: auto;
  width: 75%;
}
.footer {
  margin: auto;
  width: 75%;
  text-align: left;
  padding: 20px;
}
.el-header {
  color: #333;
  text-align: center;
}
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
}
.el-aside {
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: left;
}
</style>
