<template>
  <el-dialog
    v-el-drag-dialog
    :title="title"
    :visible.sync="visible"
    :before-close="close"
    :custom-class="'form-container' + ' el-dialog_' + size"
    append-to-body
  >
    <div v-if="tip" class="tip">
      <span><i class="am-icon-warning" />温馨提示：</span>
      <slot name="tip" />
    </div>
    <el-form :model="model" label-width="80px" label-position="right">
      <slot name="form" />
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="danger" @click="close">取消</el-button>
      <el-button type="primary" :loading="loading" @click="submit">{{
        buttonText
      }}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

export default {
  name: 'FromInfo',
  directives: { elDragDialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: null
    },
    action: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Form表单'
    },
    buttonText: {
      type: String,
      default: '保存'
    },
    size: {
      type: String,
      default: 'md'
    },
    tip: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    submit: function() {
      this.loading = true
      this.$emit('submit', this.model)
      if (this.action) {
        this.$form(this.action, this.model)
          .then((res) => {
            this.loading = false
            this.$message({
              type: res.success ? 'success' : 'error',
              message: res.success ? '提交成功' : res.msg
            })
            if (res.success) {
              this.$emit('close')
            }
            this.$emit('success', res)
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    close: function() {
      this.$emit('close')
    }
  }
}
</script>
