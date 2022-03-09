<!--
 * @description:用户管理页面
 * @fileName: index.vue
 * @author: zhuangweilong
 * @date:
 * @后台人员:zhuangweilong
 * @path:
 * @version: V1.0.0
!-->
<template>
  <div class="app-container">
    <div>
      <span>昵称</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width:500px;margin-left:1%;margin-right:1%"
        @keyup.enter.native="searchStudentByName"
      />
      <el-button type="primary" @click="searchStudentByName">查询</el-button>
    </div>
    <hr>
    <div>
      <mydialog style="display:inline;margin-right:1%" button-name="增加" @clicksubmit="insertStudent">
        <el-form :model="form">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phonenumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="签名" :label-width="formLabelWidth">
            <el-input v-model="form.signature" autocomplete="off" />
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-input v-model="form.birthday" autocomplete="off" />
          </el-form-item>
        </el-form>
      </mydialog>
      <el-button type="danger" @click="deleteUserBySelected">删除</el-button>
    </div>
    <hr>
    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="id"
        label="账号"
        width="120"
      />
      <el-table-column
        prop="nickname"
        label="昵称"
        width=""
      />
      <el-table-column
        prop="phoneNumber"
        label="手机号"
        show-overflow-tooltip
      />
      <el-table-column
        prop="signature"
        label="签名"
        show-overflow-tooltip
      />
      <el-table-column
        prop="birthday"
        label="生日"
        show-overflow-tooltip
      />
      <el-table-column
        prop="opera"
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button type="text" @click="deleteUserById(scope.row.id)">删除</el-button>
          <div style="display:inline;margin-left:3%">
            <mydialog
              style="display:inline;margin-right:1%"
              button-name="编辑"
              button-type="text"
              @clicksubmit="updateStudent(scope.row.id)"
            >
              <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                  <el-input v-model="form.id" autocomplete="off" :disabled="true" />
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                  <el-input v-model="form.nickname" autocomplete="off" />
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                  <el-input v-model="form.phonenumber" autocomplete="off" />
                </el-form-item>
                <el-form-item label="签名" :label-width="formLabelWidth">
                  <el-input v-model="form.signature" autocomplete="off" />
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth">
                  <el-input v-model="form.birthday" autocomplete="off" />
                </el-form-item>
              </el-form>
            </mydialog>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, deleteUserById } from '@/api/usermanage'
import Mydialog from '@/components/Mydialog'
export default {
  components: {
    Mydialog
  },
  filters: {},
  data() {
    return {
      list: null,
      listLoading: true,
      input: '',
      multipleSelection: [],
      form: {
        id: '',
        nickname: '',
        phone: '',
        birthday: '',
        signature: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.fetchData()
    // eslint-disable-next-line no-undef
  },
  methods: {
    fetchData() {
      console.log('加载表格')
      this.listLoading = true
      getUserList().then(response => {
        this.list = response
        console.log(response)
        console.log(this.list)
        this.listLoading = false
      })
    },
    /*
     *@description:插入学生
     *@author: zhuangweilong
     *@date: 2021-08-21 10:27:22
     *@version: V1.0.0
    */
    insertStudent() {
      // insertStudent(this.form).then(response => {
      //   console.log('表单如下:' + this.form)
      //   if (response) {
      //     this.$message({
      //       type: 'success',
      //       message: '添加成功!'
      //     })
      //   }
      // })
      setTimeout(function() {
        location.reload()
      }, 500)
    },
    /*
     *@description:通过id删除用户
     *@author: zhuangweilong
     *@date:
     *@version: V1.0.0
    */
    deleteUserById(id) {
      console.log('要删除的Id如下' + id)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserById(id).then(response => {
          console.log('Id如下:' + id)
          console.log(response)
          if (response) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          setTimeout(function() {
            location.reload()
          }, 500)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /*
     *@description:通过idSet批量删除选中学生
     *@author: zhuangweilong
     *@date: 2021-08-21 10:26:37
     *@version: V1.0.0
    */
    deleteUserBySelected() {
      console.log('选中项')
      const _selectData = this.$refs.multipleTable.selection
      console.log(_selectData)
      const idSet = []
      for (const date of _selectData) {
        idSet.push(date.id)
      }
      this.$confirm('此操作将永久删除这' + idSet.length + '条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        idSet.forEach(element => {
          deleteUserById(element).then(response => {
            if (response) {
              console.log('删除一条数据')
            }
          })
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        setTimeout(function() {
          location.reload()
        }, 500)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /*
     *@description:更新学生
     *@author: zhuangweilong
     *@date: 2021-08-21 10:27:39
     *@version: V1.0.0
    */
    updateStudent(id) {
      // var student = {
      //   id: id,
      //   name: this.form.name,
      //   sex: this.form.sex,
      //   birthday: this.form.birthday
      // }
      // updateStudent(student).then(response => {
      //   console.log('更新该学生使用的数据如下:' + student)
      //   if (response) {
      //     this.$message({
      //       type: 'success',
      //       message: '更新成功!'
      //     })
      //   }
      // })
      setTimeout(function() {
        location.reload()
      }, 500)
    },
    /*
     *@description:通过名字搜索并返回对应学生列表
     *@author: zhuangweilong
     *@date: 2021-08-21 10:25:27
     *@version: V1.0.0
    */
    searchStudentByName() {
      this.listLoading = true
      if (!this.input) {
        this.fetchData()
      } else {
        // searchStudentByName(this.input).then(response => {
        //   console.log('搜索输入框内容为:' + this.input)
        //   this.list = response
        //   this.listLoading = false
        // })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
