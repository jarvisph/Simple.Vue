<template>
  <el-dialog :title="title" :visible.sync="visible" :before-close="close" width="300px">
    <el-progress :percentage="percentage" />
    <span slot="footer" class="dialog-footer" />
  </el-dialog>
</template>

<script>
export default {
  name: 'Percentage',
  props: {
    url: {
      type: String,
      default: 'merchant/export/gettask'
    }
  },
  data() {
    return {
      percentage: 0,
      visible: false,
      title: '任务进度',
      timer: null,
      taskId: null,
      callback: function() {

      }
    }
  },
  methods: {
    close: function() {
      clearInterval(this.timer)
      this.visible = false
    },
    loadSchedule(callback) {
      var _refs = this
      this.$post({
        url: this.url,
        data: {
          TaskID: this.taskId
        }
      }).then(function(res) {
        _refs.title = '任务进度-' + res.info.Total
        _refs.percentage = Math.round(res.info.Count / res.info.Total * 100, 2)
        if (res.Count === res.Total || res.Count > res.Total) {
          _refs.percentage = 100
          clearInterval(_refs.timer)
          setTimeout(callback, 1000)
          setTimeout(() => {
            _refs.visible = false
          }, 1000)
        }
      })
    },
    init: function(taskId, callback) {
      this.visible = true
      this.taskId = taskId
      this.percentage = 0
      this.title = '任务进度'
      var _refs = this
      this.timer = setInterval(() => {
        _refs.loadSchedule(callback)
      }, 1000)
    }
  }
}

</script>
