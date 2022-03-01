<!--
 * @description: 资源分享网-用户发布文章
 * @fileName: UserCreatePost.vue
 * @author: 庄威龙
 * @date:2022-01-30 18:26:38
 * @后台人员:
 * @path:
 * @version: V1.0.2
 * @modified Description: 修改了下拉框的样式
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

            <div class="droplist">
              <div class="module">
                <span style="font-size: 22px">板块：</span>
                <el-select v-model="ruleForm.moduleId" placeholder="请选择">
                  <el-option-group
                    v-for="group in modules"
                    :key="group.label"
                    :label="group.label"
                  >
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-option-group>
                </el-select>
              </div>
              <div class="tags">
                <span style="font-size: 22px">Tag：</span>
                <el-select v-model="ruleForm.tagId" placeholder="请选择">
                  <el-option-group
                    v-for="group in tags"
                    :key="group.label"
                    :label="group.label"
                  >
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-option-group>
                </el-select>
              </div>
            </div>
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
// import { postBlog, updateTag, getAllTags, getAllModules } from '@/api/blog'
// import { getNowTime } from '@/utils/time'
import store from '@/store'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'UserCreatePost',

  data() {
    return {
      contentEditor: {},
      ruleForm: {
        title: '', // 标题
        moduleId: [], // 标签
        content: '', // 内容
        tagId: [] // 标签
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
      },
      modules: [
        {
          label: '模块',
          options: [
            {
              value: '2',
              label: '经验'
            },
            {
              value: '21',
              label: '找研友'
            }
          ]
        }
      ],
      tags: [
        {
          label: '文章标签',
          options: [
            {
              value: '0',
              label: '福州大学'
            },
            {
              value: '3',
              label: '外校' // 还未制作
            },
            {
              value: '1',
              label: '经验'
            },
            {
              value: '2',
              label: '资讯'
            }
          ]
        }
      ]
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
    this.getTags()
    this.getModules()
  },
  created() {},
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
          // if (
          //   this.ruleForm.moduleId == null ||
          //   this.ruleForm.moduleId.length === 0
          // ) {
          //   alert('标签不可以为空')
          //   return false
          // }
          this.ruleForm.content = this.contentEditor.getValue()
          var blog = {
            author: store.getters.user.name,
            collectionNumber: '',
            content: this.ruleForm.content,
            moduleId: this.ruleForm.moduleId,
            // releaseTime: getNowTime(),
            title: this.ruleForm.title
          }
          console.log(blog)

          // postBlog(blog).then((response) => {
          //   const { data } = response
          //   // console.log(data.data);
          //   // 展示刚发布的文章详情页  !!先返回首页
          //   var id = {
          //     id: data.data
          //   }
          //   var tags = [this.ruleForm.tagId]
          //   updateTag(id, tags).then((response) => {
          //     console.log('updateTag')
          //   })
          //   setTimeout(() => {
          //     this.$message({
          //       message: '成功发表',
          //       type: 'success',
          //       duration: 1000
          //     })
          //     this.detailById(data.data)
          //   }, 800)
          // })
        } else {
          this.$message({
            message: '发表失败',
            type: 'error',
            duration: 1000
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.contentEditor.setValue('')
      this.ruleForm.moduleId = ''
    },
    detailById(id) {
      console.log(id)
      const routeData = this.$router.resolve({
        path: '/Detail',
        query: { key: id }
      })
      window.open(routeData.href, '_self')
    },
    /**
     *@functionName: getTags
     *@description: 获取数据库中的标签
     *@author: lw
     *@date: 2021-06-11 16:15:31
     *@version: V1.0.0
     */
    getTags() {
      console.log(this.tags)
      // const _this = this
      // getAllTags().then((response) => {
      //   var data = response.data.data
      //   var tags = {}
      //   // eslint-disable-next-line no-array-constructor
      //   tags = new Array()
      //   for (let i = 0; i < data.length; i++) {
      //     var o = { value: '321', label: '123' }
      //     o.label = data[i].name
      //     o.value = data[i].id
      //     tags.push(o)
      //   }
      //   _this.tags[0].options = tags
      // })
    },

    getModules() {
      // const _this = this
      // getAllModules().then((response) => {
      //   console.log(response.data)
      //   var data = response.data.data
      //   var modules = {}
      //   // eslint-disable-next-line no-array-constructor
      //   modules = new Array()
      //   for (let i = 0; i < data.length; i++) {
      //     var o = { value: '321', label: '123' }
      //     o.label = data[i].name
      //     o.value = data[i].id
      //     modules.push(o)
      //   }
      //   _this.modules[0].options = modules
      // })
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
