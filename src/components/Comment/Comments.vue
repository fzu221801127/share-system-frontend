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
      style="background: white;border-top: solid #e3f3f3 1px"
    >
      <el-container>
        <el-aside width="150px">
          <div style="padding-left: 0px; padding-top: 20px">
            <img
              :src="imgUrl"
              alt="头像"
              style="
                width: 70px;
                height: 70px;
                margin-left: 6px;
                padding: 0;
                line-height: 0;
                position: relative;
                left: 35px;
              "
            >
            <div
              style="
                font-size: 18px;
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
              {{ comment.userId }}
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-main style="font-size: 18px">
            <div style="word-wrap: break-word">
              {{ comment.content }}
            </div>
          </el-main>
          <el-footer style="height:80px">
            <div style="float: right;padding-top:20px;">
              <span style="font-size: 15px;margin-right:10px">{{ comment.releasetime }}</span>
              <div>
                <el-button
                  type="text"
                  style="float: right"
                  @click="showForm(comment)"
                >
                  {{ buttonState }}
                </el-button>
              </div>
            </div>
          </el-footer>
        </el-container>
      </el-container>
      <transition name="slide-fade">
        <div v-if="comment.SecondComment">
          <div style="width: 82%; margin-left: 17%">
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
import { getFirstComments } from '@/api/comment'
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
      var postId = parseInt(this.blogId)
      getFirstComments(postId).then((response) => {
        // const { data } = response
        this.comments = response
        console.log(this.comments)
      })
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
