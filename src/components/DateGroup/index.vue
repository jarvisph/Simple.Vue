<template>
  <div v-if="show" class="filter-item">
    <el-date-picker
      v-model="startTime"
      :type="type"
      :placeholder="placeholder1"
      :start-time="startTime"
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
      :end-time="endTime"
      class="w180"
      align="right"
      style="width: 180px"
      size="mini"
      @change="success"
    />
  </div>
</template>
<script>
import {
  parseTime
} from '@/utils/index'
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
    // 格式化日期：yyyy-MM-dd
    formatDate(date) {
      var myyear = date.getFullYear()
      var mymonth = date.getMonth() + 1
      var myweekday = date.getDate()
      if (mymonth < 10) {
        mymonth = '0' + mymonth
      }
      if (myweekday < 10) {
        myweekday = '0' + myweekday
      }
      return myyear + '-' + mymonth + '-' + myweekday
    },
    // 获得某月的天数
    getMonthDays(myMonth) {
      var date = this.getNowformat()
      var monthStartDate = new Date(date.nowYear, myMonth, 1)
      var monthEndDate = new Date(date.nowYear, myMonth + 1, 1)
      var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
      return days
    },
    // 获得本季度的开始月份
    getQuarterStartMonth() {
      var date = this.getNowformat()
      var quarterStartMonth = 0
      if (date.nowMonth < 3) {
        quarterStartMonth = 0
      }
      if (date.nowMonth > 2 && date.nowMonth < 6) {
        quarterStartMonth = 3
      }
      if (date.nowMonth > 5 && date.nowMonth < 9) {
        quarterStartMonth = 6
      }
      if (date.nowMonth > 8) {
        quarterStartMonth = 9
      }
      return quarterStartMonth
    },
    getNowformat() {
      var now = new Date() // 当前日期
      var nowDayOfWeek = now.getDay() - 1 // 今天本周的第几天
      var nowDay = now.getDate() // 当前日
      var nowMonth = now.getMonth() // 当前月
      var nowYear = now.getYear() // 当前年
      nowYear += nowYear < 2000 ? 1900 : 0 //
      var lastMonthDate = new Date() // 上月日期
      lastMonthDate.setDate(1)
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
      var lastYear = lastMonthDate.getYear()
      var lastMonth = lastMonthDate.getMonth()
      return {
        nowDayOfWeek,
        nowDay,
        nowMonth,
        nowYear,
        lastYear,
        lastMonth
      }
    },
    // 获得本周的开始日期
    getWeekStartDate() {
      var date = this.getNowformat()
      var weekStartDate = new Date(date.nowYear, date.nowMonth, date.nowDay - date.nowDayOfWeek)
      return this.formatDate(weekStartDate)
    },
    // 获得本周的结束日期
    getWeekEndDate() {
      var date = this.getNowformat()
      var weekEndDate = new Date(date.nowYear, date.nowMonth, date.nowDay + (6 - date.nowDayOfWeek))
      return this.formatDate(weekEndDate)
    },
    // 获得上周的开始日期
    getLastWeekStartDate() {
      var date = this.getNowformat()
      var weekStartDate = new Date(date.nowYear, date.nowMonth, date.nowDay - date.nowDayOfWeek - 7)
      return this.formatDate(weekStartDate)
    },
    // 获得上周的结束日期
    getLastWeekEndDate() {
      var date = this.getNowformat()
      var weekEndDate = new Date(date.nowYear, date.nowMonth, date.nowDay - date.nowDayOfWeek - 1)
      return this.formatDate(weekEndDate)
    },
    // 获得本月的开始日期
    getMonthStartDate() {
      var date = this.getNowformat()
      var monthStartDate = new Date(date.nowYear, date.nowMonth, 1)
      return this.formatDate(monthStartDate)
    },
    // 获得本月的结束日期
    getMonthEndDate() {
      var date = this.getNowformat()
      var monthEndDate = new Date(date.nowYear, date.nowMonth, this.getMonthDays(date.nowMonth))
      return this.formatDate(monthEndDate)
    },
    // 获得上月开始时间
    getLastMonthStartDate() {
      var date = this.getNowformat()
      var lastMonthStartDate = null
      if (date.lastMonth === 11) {
        lastMonthStartDate = new Date(date.nowYear - 1, date.lastMonth, 1)
      } else {
        lastMonthStartDate = new Date(date.nowYear, date.lastMonth, 1)
      }
      return this.formatDate(lastMonthStartDate)
    },
    // 获得上月结束时间
    getLastMonthEndDate() {
      var date = this.getNowformat()
      var lastMonthEndDate = null
      if (date.lastMonth === 11) {
        lastMonthEndDate = new Date(date.nowYear - 1, date.lastMonth, this.getMonthDays(date.lastMonth))
      } else {
        lastMonthEndDate = new Date(date.nowYear, date.lastMonth, this.getMonthDays(date.lastMonth))
      }
      return this.formatDate(lastMonthEndDate)
    },
    // 获得本季度的开始日期
    getQuarterStartDate() {
      var date = this.getNowformat()
      var quarterStartDate = new Date(date.nowYear, this.getQuarterStartMonth(), 1)
      return this.formatDate(quarterStartDate)
    },
    // 获得本季度的结束日期
    getQuarterEndDate() {
      var date = this.getNowformat()
      var quarterEndMonth = this.getQuarterStartMonth() + 2
      var quarterStartDate = new Date(date.nowYear, quarterEndMonth, this.getMonthDays(quarterEndMonth))
      return this.formatDate(quarterStartDate)
    },
    picker() {
      const _this = this
      this.pickerOptions.shortcuts = [{
        text: '~今天~',
        onClick(picker) {
          var date = new Date()
          var today = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
          picker.$emit('pick', new Date(today))
          _this.endTime = new Date(`${today} 23:59:59`)
        }
      },
      {
        text: '~昨天~',
        onClick(picker) {
          var date = new Date()
          date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
          var yesterday = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
          picker.$emit('pick', new Date(`${yesterday} 00:00:00`))
          _this.endTime = new Date(`${yesterday} 23:59:59`)
        }
      },
      {
        text: '~本周~',
        onClick(picker) {
          picker.$emit('pick', new Date(`${_this.getWeekStartDate()} 00:00:00`))
          _this.endTime = new Date(`${_this.getWeekEndDate()} 23:59:59`)
        }
      },
      {
        text: '~本月~',
        onClick(picker) {
          picker.$emit('pick', new Date(`${_this.getMonthStartDate()} 00:00:00`))
          _this.endTime = new Date(`${_this.getMonthEndDate()} 23:59:59`)
        }
      },
      {
        text: '~上周~',
        onClick(picker) {
          picker.$emit('pick', new Date(`${_this.getLastWeekStartDate()} 00:00:00`))
          _this.endTime = new Date(`${_this.getLastWeekEndDate()} 23:59:59`)
        }
      },
      {
        text: '~上月~',
        onClick(picker) {
          picker.$emit('pick', new Date(`${_this.getLastMonthStartDate()} 00:00:00`))
          _this.endTime = new Date(`${_this.getLastMonthEndDate()} 23:59:59`)
        }
      }
      ]
      this.show = true
    }
  }
}

</script>
