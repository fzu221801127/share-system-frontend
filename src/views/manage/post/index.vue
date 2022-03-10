<!--
 * @description:资源管理页面
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
      <span>标题</span>
      <el-input
        v-model="input"
        placeholder="请输入内容"
        style="width:500px;margin-left:1%;margin-right:1%"
        clearable
        @keyup.enter.native="searchPostByTitle"
      />
      <el-button type="primary" icon="el-icon-search" @click="searchPostByTitle">搜索</el-button>
    </div>
    <hr>
    <div>
      <el-button type="danger" @click="deletePostBySelected">删除</el-button>
      <el-button @click="clearFilter">清除所有过滤器</el-button>
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
      <!--最左边尖括号展开-->
      <el-table-column type="expand" width="25px">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="发布日期">
              <span>{{ props.row.releasetime }}</span>
            </el-form-item>
            <el-form-item label="点击量">
              <span>{{ props.row.click }}</span>
            </el-form-item>
            <el-form-item label="跳转到详情">
              <el-link
                :underline="false"
                class="is-size-6"
                @click="detailById(props.row.id)"
              >
                {{ Substr(props.row.title, 0, 300) }}
              </el-link>
            </el-form-item>
            <el-form-item label="内容" style="width:100%">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
      />
      <el-table-column
        prop="id"
        label="id"
        width="80px"
        column-key="id"
        align="center"
      />
      <el-table-column
        prop="title"
        label="标题"
        width="180px"
      >
        <template slot-scope="props">
          <el-link
            :underline="false"
            class="is-size-6"
            @click="detailById(props.row.id)"
          >
            {{ Substr(props.row.title, 0, 200) }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容预览"
        :formatter="formatter"
      >
        <template slot-scope="props">
          <span>
            {{ Substr(props.row.content, 0, 200) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100"
        :filters="[{ text: '官方资源', value: '官方资源' }, { text: '个人资源', value: '个人资源' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === '官方资源' ? 'primary' : 'success'"
            disable-transitions
          >{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="releasetime"
        label="发布日期"
        sortable
        width="100px"
        column-key="releasetime"
        align="center"
      />
      <el-table-column
        prop="click"
        label="点击量"
        sortable
        width="90px"
        column-key="click"
        align="center"
      />
      <el-table-column
        prop="opera"
        label="操作"
        width="70px"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button type="text" @click="deletePostById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="text-align:center"
      :total="total"
      :page-sizes="[10, 20, 30, 1000]"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="pageSize"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { searchPostByTitle, deletePostById, getPostPageList } from '@/api/post'

export default {
  components: {
  },
  filters: {},
  data() {
    return {
      list: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎古董车狗赛后晒哦和个骚货干啥都公司大',
        address: '上海市普陀区金沙江路 1518 弄io故事大纲十大h广佛爱好三个是故事大纲四阿哥粉碎大哥i十大是个代购i速度十大硅酸钙德国i哦i哦傻噶啥的撒大噶i哦好个傻瓜现场个傻瓜分公司的噶三国杀的刮痧噶啥的噶啥的噶啥的爱干啥噶啥噶噶啥的噶啥多个噶啥爱国散搭噶啥的噶噶啥的给沙噶啥多个沙杠杆收购按时给杀手多个艰苦撒旦和公开傻瓜啊ui给i十大固沙有啥共有四大给法院关于噶是否大于啥',
        tag: '官方资源',
        clicks: '122'
      }, {
        id: 3,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '个人资源',
        clicks: '853'
      }, {
        id: 112,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '533'
      }, {
        id: 321,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '个人资源',
        clicks: '619'
      }, {
        id: 1122,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '233'
      }, {
        id: 152,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '官方资源',
        clicks: '523'
      }, {
        id: 154,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '个人资源',
        clicks: '23'
      }],
      listLoading: true,
      input: '',
      multipleSelection: [],
      form: {
        id: '',
        name: '',
        phone: '',
        birthday: '',
        signature: ''
      },
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 10,
      total: 1
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
      getPostPageList(this.currentPage, this.pagesize).then(response => {
        this.list = response.page.list
        this.total = response.page.total
        this.listLoading = false
        console.log(response)
      })
    },
    Substr(str, start, n) {
      if (str == null) return null
      // eslint-disable-line
      if (str.replace(/[\u4e00-\u9fa5]/g, '**').length <= n) {
        return str
      }
      let len = 0
      let tmpStr = ''
      for (let i = start; i < str.length; i++) {
        // 遍历字符串
        if (/[\u4e00-\u9fa5]/.test(str[i])) {
          // 中文 长度为两字节
          len += 2
        } else {
          len += 1
        }
        if (len > n) {
          break
        } else {
          tmpStr += str[i]
        }
      }
      return tmpStr + '...'
    },
    resetDateFilter() {
      this.$refs.multipleTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.multipleTable.clearFilter()
    },
    formatter(row, column) {
      return row.content
    },
    filterTag(value, row) {
      return row.type === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.currentPage = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData()
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
     *@description:通过id删除资源
     *@author: zhuangweilong
     *@date: 2021-08-21 10:28:11
     *@version: V1.0.0
    */
    deletePostById(id) {
      console.log('要删除的Id如下' + id)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePostById(id).then(response => {
          console.log('Id如下:' + id)
          console.log(response)
          if (response) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.fetchData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /*
     *@description:通过idSet批量删除选中资源
     *@author: zhuangweilong
     *@date: 2021-08-21 10:26:37
     *@version: V1.0.0
    */
    deletePostBySelected() {
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
          deletePostById(element).then(response => {
            if (response) {
              console.log('删除一条数据')
            }
            this.fetchData()
          })
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /*
     *@description:更新资源
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
      //   console.log('更新该资源使用的数据如下:' + student)
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
     *@description:通过名字搜索并返回对应资源列表
     *@author: zhuangweilong
     *@date: 2021-08-21 10:25:27
     *@version: V1.0.0
    */
    searchPostByTitle() {
      this.listLoading = true
      if (!this.input) {
        this.fetchData()
      } else {
        searchPostByTitle(this.input).then(response => {
          console.log('搜索输入框内容为:' + this.input)
          this.list = response
          this.currentPage = 1
          this.total = 10
          this.listLoading = false
        })
      }
    },
    detailById(id) {
      console.log(id)
      const routeData = this.$router.resolve({
        path: '/Detail',
        query: { key: id }
      })
      window.open(routeData.href, '_blank')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
