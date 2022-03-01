<!--
 * @description:
 * @fileName: SecondCommentsForm.vue
 * @author: 庄威龙
 * @date:
 * @后台人员:
 * @path:
 * @version: V1.0.5
!-->
<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <el-input
          v-model.lazy="commentText"
          v-model="textarea"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          :disabled="isLoading"
          style="width:96%;margin-left:2%"
        />
        <div style="height:60px">
          <el-button
            type="primary"
            round
            native-type="submit"
            :disabled="isLoading"
            style="float:right;margin-top:10px"
          >
            发送
          </el-button>
        </div>
      </form>
    </div>
  </article>
</template>

<script>
// import { pushSecondComment } from '@/api/comment'
export default {
  name: 'LvCommentsForm',
  props: {
    slug: {
      type: String,
      default: null
    },
    firstCommentId: {
      type: Number,
      default: 1
    },
    firstCommentAuthor: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      commentText: '',
      isLoading: false,
      textarea: ''
    }
  },
  methods: {
    async onSubmit() {
      // this.isLoading = true
      console.log(this.firstCommentId)
      console.log(this.firstCommentAuthor)
      // var data = {
      //   "accountName": this.firstCommentAuthor,
      //   "author": store.getters.user,
      //   "commentId": this.firstCommentId,
      //   "content": this.textarea,
      //   "id": 1,
      //   "releaseTime": ""
      // }
      // var data = {
      //   'accountName': this.firstCommentAuthor,
      //   'author': store.getters.user.name,
      //   'commentId': this.firstCommentId,
      //   'content': this.textarea,
      //   'id': 1,
      //   'releaseTime': ''
      // }
      // pushSecondComment(data).then((response) => {
      //   try {
      //     const { data } = response
      //     if (data.code == '200') {
      //       this.$message.success('留言成功')
      //       setTimeout(() => {
      //         location.reload()
      //       }, 800)
      //     }
      //   } catch (e) {
      //     this.message({
      //       message: `Cannot comment this story. ${e}`,
      //       type: 'is-danger'
      //     })
      //   } finally {
      //     this.isLoading = false
      //   }
      // })
      // this.textarea = ''
      // let postData = {}
      // console.log(this.commentText)
      // postData['content'] = this.commentText
      // postData['topic_id'] = this.slug
      // await pushComment(postData)
      // this.$emit('loadComments', this.slug)
      // this.$message.success('留言成功')
    }
  }
}
</script>
