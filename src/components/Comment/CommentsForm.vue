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
import { insertFirstComment } from '@/api/comment'
import { logout, getInfo } from '@/api/user'
import { getNowTime } from '@/utils/time'
// import store from '@/store'
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
      if (this.$session.get('userinfo') != null) {
        var userinfo = this.$session.get('userinfo')
        console.log(userinfo.id)
        this.isLoading = true
        console.log(this.blogId)
        var data = {
          'postId': this.blogId,
          'releasetime': getNowTime(),
          'content': this.textarea,
          'userId': userinfo.id
        }
        insertFirstComment(data).then((response) => {
          try {
            if (response) {
              this.$message.success('留言成功')
              setTimeout(() => {
                location.reload()
              }, 800)
            }
          } catch (e) {
            this.$message({
              message: `Cannot comment this story. ${e}`,
              type: 'is-danger'
            })
          } finally {
            this.isLoading = false
          }
        })
        this.textarea = ''
      } else {
        logout()
        getInfo().then(res => {
          console.log('res:')
          console.log(res)
        })
      }
    }
  }
}
</script>
