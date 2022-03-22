<!--
 * @description: 资源分享网-用户发布文章
 * @fileName: UserCreatePost.vue
 * @author: 庄威龙
 * @date:
 * @后台人员:
 * @path:
 * @version: V1.0.0
 * @modified Description:
!-->
<template>
  <div class="columns">
    <div class="column is-full">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span><i class="fa fa fa-book"> 发布文章</i></span>
        </div>
        <div>
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
          >
            <p style="font-size: 18px">标题</p>
            <el-form-item prop="title">
              <el-input v-model="ruleForm.title" placeholder="输入主题名称" />
            </el-form-item>

            <p style="font-size: 18px">内容</p>
            <!--Markdown-->
            <div id="vditor" />

            <br>

            <div style="padding-top: 20px">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >立即创建
                </el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { getNowTime } from '@/utils/time'
import { insertPost } from '@/api/post'
import { logout, getInfo } from '@/api/user'
export default {
  name: 'UserCreatePost',
  data() {
    return {
      contentEditor: {},
      ruleForm: {
        title: '', // 标题
        content: '' // 内容
      },
      rules: {
        title: [
          { required: true, message: '请输入话题名称', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 1 到 25 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      height: 500,
      placeholder: '此处为话题内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'sv',
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        // 'record',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'edit-mode',
        // 'content-theme',
        'code-theme',
        'export',
        {
          name: 'more',
          toolbar: ['fullscreen', 'both', 'preview', 'info', 'help']
        }
      ]
    })
  },
  created() {
    if (this.$session.get('userinfo') != null) {
      var userinfo = this.$session.get('userinfo')
      console.log(userinfo.id)
    } else {
      logout()
      getInfo().then(res => {
        console.log('res:')
        console.log(res)
      })
    }
  },
  methods: {
    /**
     *@functionName:    submitForm
     *@params1: 表单名称
     *@description: 发表文章 发布成功后跳转到文章详情页
     *@author: 庄威龙
     *@date:
     *@version: V1.0.0
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.contentEditor.getValue().length === 1 ||
            this.contentEditor.getValue() == null ||
            this.contentEditor.getValue() === ''
          ) {
            alert('话题内容不可为空')
            return false
          }
          this.ruleForm.content = this.contentEditor.getValue()
          var blog = {
            title: this.ruleForm.title,
            content: this.ruleForm.content,
            releasetime: getNowTime(),
            type: '官方资源',
            click: 0,
            userId: this.$session.get('userinfo').id,
            state: '未被举报',
            tag: null
          }
          console.log(blog)
          insertPost(blog).then((response) => {
            if (response) {
              setTimeout(() => {
                this.$message({
                  message: '成功发表',
                  type: 'success'
                })
              }, 500)
              this.ruleForm.title = ''
              this.ruleForm.content = ''
              this.contentEditor.setValue('')
            } else {
              this.$message({
                message: '发表失败',
                type: 'error'
              })
            }
          })
        } else {
          this.$message({
            message: '发表失败',
            type: 'error'
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.contentEditor.setValue('')
    },
    detailById(id) {
      console.log(id)
      const routeData = this.$router.resolve({
        path: '/Detail',
        query: { key: id }
      })
      window.open(routeData.href, '_self')
    }
  }
}
</script>

<style>
.droplist {
  width: 100%;
  margin-top: 20px;
  display: inline-flex;
}
.module {
  width: 30%;
  display: inline;
  clear: both;
}
.tag {
  width: 70%;
  display: inline;
}
</style>
