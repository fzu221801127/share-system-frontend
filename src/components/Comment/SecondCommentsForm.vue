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
import { logout, getInfo } from '@/api/user'
import { getNowTime } from '@/utils/time'
import { insertSecondComment } from '@/api/comment'
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
      if (this.$session.get('userinfo') != null) {
        var userinfo = this.$session.get('userinfo')
        console.log(userinfo.id)
        this.isLoading = true
        console.log(this.firstCommentId)
        var data = {
          'firstCommentId': this.firstCommentId,
          'releasetime': getNowTime(),
          'content': this.textarea,
          'userId': userinfo.id
        }
        insertSecondComment(data).then((response) => {
          try {
            if (response) {
              this.$message.success('留言成功')
              setTimeout(() => {
                location.reload()
              }, 800)
            }
          } catch (e) {
            this.message({
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
