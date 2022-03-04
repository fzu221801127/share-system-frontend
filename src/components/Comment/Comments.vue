<!--
 * @description:
 * @fileName: Comments.vue
 * @author: 庄威龙
 * @date:
 * @后台人员:
 * @path:
 * @version: V1.0.5
!-->
<template>
  <div>
    <div
      v-for="comment in comments"
      :key="comment.id"
      style="background: white; border: solid #e3f3f3 1px"
    >
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
                font-size: 20px;
                width: 100%;
                padding: 0;
                margin: 0;
                word-break: break-all;
                white-space: normal;
                line-height: 20px;
                position: relative;
                text-align: center;
              "
            >
              {{ comment.author }}
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-main style="font-size: 20px">
            <div style="word-wrap: break-word">
              {{ comment.content }}
            </div>
          </el-main>
          <el-footer height="120px">
            <div style="float: right">
              <!-- <el-button round style="background-color: #ff4949; color: white"
                >点赞</el-button
              > -->
              <br>
              <span style="font-size: 15px;margin-right:10px">{{ comment.releaseTime }}</span>
              <!-- <el-button type="text">举报</el-button> -->
              <br>
              <el-button
                type="text"
                style="float: right"
                @click="showForm(comment)"
              >{{ buttonState }}</el-button>
            </div>
          </el-footer>
        </el-container>
      </el-container>
      <transition name="slide-fade">
        <div v-if="comment.SecondComment">
          <div style="width: 79%; margin-left: 20%">
            <CreateSecondComment
              :first-comment-id="comment.id"
              :first-comment-author="comment.author"
            />
          </div>
        </div>
      </transition>
      <SecondComment :first-comment-id="comment.id" />
      <br>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import { getFirstComments } from '@/api/comment'
import SecondComment from '@/components/Comment/SecondComments'
import CreateSecondComment from '@/components/Comment/CreateSecondComment'

export default {
  name: 'Detail',
  components: {
    SecondComment,
    CreateSecondComment
  },
  props: {
    blogId: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      firstCommentId: 0,
      comments: [],
      buttonState: '评论',
      // avatar
      imgUrl: 'https://img0.baidu.com/it/u=3725297972,3236585201&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.FirstComment()
  },
  methods: {
    showForm: function(comment) {
      if (this.buttonState === '评论') {
        comment.SecondComment = true
        this.buttonState = '收起'
      } else {
        comment.SecondComment = false
        this.buttonState = '评论'
      }
    },
    FirstComment: function() {
      // var params = {
      //   flag: 0,
      //   id: this.blogId
      // }
      // getFirstComments(params).then((response) => {
      //   console.log(params.id)
      //   // const { data } = response
      //   this.comments = response.data.data
      //   console.log(this.comments)
      // })
      console.log('一级评论获取到的博客id为:' + this.blogId)
      this.comments = [
        {
          id: 1,
          author: 'zzz',
          content: '嘎洒还干啥回归到谁goisdhfgiohsioaghigsagsoaighousahgoushaguohasuoghuoshaguishagsdagsijabgksbgiusbauigbuisguisuiaguisguisauigiusaguisauisauihauig79y7oashoui5h32oi15hoih435oih23oi5h1io4h5ioh14o5h打鬼煞鬼十大尴尬ui杀鬼划时代i鬼煞鬼i刷的过 沙蒂固ui撒大噶iusaui公司丢谁啊的归属',
          releaseTime: '2021-05-11 22:25:00'
        },
        {
          id: 3,
          author: '公司大',
          content: '哦i更少个傻瓜公司大规划',
          releaseTime: '2021-05-11 22:25:21'
        }
      ]
    }
  }
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
