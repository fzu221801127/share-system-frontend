<template>
  <div>
    <!-- Form -->
    <el-button :type="buttonType" @click="dialogFormVisible = true">{{ buttonName }}</el-button>

    <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
      <!-- <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off">4</el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai">5</el-option>
            <el-option label="区域二" value="beijing">6</el-option>
          </el-select>
        </el-form-item> -->
      <!-- </el-form> -->
      <slot />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: '对话框按钮'
    },
    buttonType: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      // form: {
      //   name: '',
      //   region: '',
      //   date1: '',
      //   date2: '',
      //   delivery: false,
      //   type: [],
      //   resource: '',
      //   desc: ''
      // },
      // formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created() {
    this.$emit('starmydialog')
  },
  methods: {
    submit() {
      this.dialogFormVisible = false
      this.$emit('clicksubmit')
    }
  }
}
</script>
