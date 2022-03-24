<!--
 * @description:
 * @fileName: SecondComments.vue
 * @author: 庄威龙
 * @date:
 * @后台人员:
 * @path:
 * @version: V1.0.5
!-->
<template>
  <div>
    <!-- <div>父评论id:{{firstCommentId}}</div> -->
    <div
      v-for="comment in comments"
      :key="comment.id"
      style="
        background-color: #f3f3f3;
        margin-left: 17%;
        width: 82%;
        border-top: solid #b0c4de 1px;
        padding-left: 0px;
        padding-top: 18px;
      "
    >
      <el-container>
        <el-aside width="120px">
          <div>
            <img
              :src="imgUrl"
              alt="头像"
              style="
                width: 50px;
                height: 50px;
                margin-left: 25px;
                padding: 0;
                line-height: 0;
              "
            >
            <div
              style="
                font-size: 15px;
                width: 80%;
                padding: 0;
                margin-left: 0;
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
          <el-main style="font-size: 16px">
            {{ comment.content }}
          </el-main>
          <el-footer>
            <div style="float: right">
              <span style="font-size: 15px;margin-right:10px">{{ comment.releasetime }}</span>
              <!-- <el-button
                round
                style="background-color: #ff4949; color: white; font-size: 3px"
                >点赞</el-button
              > -->
              <!-- <el-button type="text">举报</el-button> -->
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getSecondComments } from '@/api/comment'
export default {
  name: 'Detail',
  components: {},
  props: {
    firstCommentId: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      comments: [
        {
          id: '1',
          author: 'zzz',
          content: '嘎洒还干啥回归到谁打鬼煞鬼十大尴尬ui杀鬼划时代i鬼煞鬼i刷的过 沙蒂固ui撒大噶iusaui公司丢谁啊的归属',
          releaseTime: '2021-05-11 22:24:10'
        },
        {
          id: '3',
          author: '公司大',
          content: '哦i更少个傻瓜公司大规划',
          releaseTime: '2021-05-11 22:23:21'
        }
      ],
      // avatar
      imgUrl: 'https://img0.baidu.com/it/u=3725297972,3236585201&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'

    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.SecondComment()
  },
  methods: {
    SecondComment: function() {
      var firstCommentId = this.firstCommentId
      getSecondComments(firstCommentId).then((response) => {
        this.comments = response
        console.log(this.comments)
      })
    }
  }
}
</script>
