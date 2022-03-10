<!--
 * @description:
 * @fileName: index.vue
 * @author: zhuangweilong
 * @date: 2021-09-03 16:56:10
 * @后台人员:
 * @path:
 * @version: V1.0.0
!-->
<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="cancel" :close-on-click-modal="false">
      <slot />
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
    },
    title: {
      type: String,
      default: '对话框'
    },
    dialogVisible: {
      type: Boolean
    }
  },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    dialogVisible(val) {
      this.visible = val
    }
  },
  created() {
    this.$emit('starmydialog')
  },
  methods: {
    submit() {
      this.$emit('clicksubmit')
    },
    cancel() {
      this.$emit('clickcancel')
    }
  }
}
</script>
