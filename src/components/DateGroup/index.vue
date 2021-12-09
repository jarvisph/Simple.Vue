<template>
  <div v-if="show" class="filter-item">
    <el-date-picker
      v-model="startTime"
      :type="type"
      :placeholder="placeholder1"
      class="w180"
      style="width: 180px"
      align="right"
      size="mini"
      :picker-options="pickerOptions"
      @change="success($event)"
    />
    <span class="filter-item" style="color: #dfe6ec">-</span>
    <el-date-picker
      v-model="endTime"
      :type="type"
      :placeholder="placeholder2"
      class="w180"
      align="right"
      style="width: 180px"
      size="mini"
      @change="success"
    />
  </div>
</template>
<script>
import { parseTime } from '@/utils/index'
export default {
  props: {
    type: {
      type: String,
      default: 'datetime'
    },
    placeholder1: {
      type: String,
      default: '~开始日期~'
    },
    placeholder2: {
      type: String,
      default: '~结束日期~'
    }
  },
  data() {
    return {
      startTime: undefined,
      endTime: undefined,
      show: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  watch: {},
  created() {
    this.picker()
  },
  methods: {
    success() {
      var start, end
      switch (this.type) {
        case 'date':
          if (this.startTime) {
            start = parseTime(this.startTime, '{y}-{m}-{d}')
          }
          if (this.endTime) {
            end = parseTime(this.endTime, '{y}-{m}-{d}')
          }
          break
        case 'datetime':
          if (this.startTime) {
            start = parseTime(this.startTime)
          }
          if (this.endTime) {
            end = parseTime(this.endTime)
          }
          break
      }
      this.$emit('success', start, end)
    },
    picker() {
      const _this = this
      this.pickerOptions.shortcuts = [
        {
          text: '~今天~',
          onClick(picker) {
            picker.$emit('pick', new Date())
            _this.endTime = new Date()
          }
        },
        {
          text: '~昨天~',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
            _this.endTime = new Date()
          }
        },
        {
          text: '~近一周~',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
            _this.endTime = new Date()
          }
        },
        {
          text: '~近一个月~',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', date)
            _this.endTime = new Date()
          }
        }
      ]
      this.show = true
    }
  }
}
</script>
