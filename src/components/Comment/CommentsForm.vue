<!--
 * @description:
 * @fileName: CommentsForm.vue
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
          :rows="10"
          placeholder="请输入内容"
          :disabled="isLoading"
        />
        <div style="float:right">
          <el-button
            type="primary"
            round
            native-type="submit"
            :disabled="isLoading"
            style="margin-top:10%"
          >
            发送
          </el-button>
        </div>
      </form>
    </div>
  </article>
</template>

<script>
// import { pushComment } from '@/api/comment'
import store from '@/store'
export default {
  name: 'LvCommentsForm',
  props: {
    slug: {
      type: String,
      default: null
    },
    blogId: {
      type: String,
      default: ''
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
      console.log(this.blogId)
      console.log(store.getters.user.name)
      // var data = {
      //   'author': store.getters.user.name,
      //   'blogId': this.blogId,
      //   'content': this.textarea,
      //   'id': 0,
      //   'releaseTime': ''
      // }
      // pushComment(data).then((response) => {
      //   try {
      //     const { data } = response
      //     // eslint-disable-next-line eqeqeq
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
    }
  }
}
</script>
