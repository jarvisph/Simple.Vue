<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '370px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ Market, Smart, Anchor, VisualSport } = {}) {
      this.chart.setOption({
        xAxis: {
          data: [
            '1~月~',
            '2~月~',
            '3~月~',
            '4~月~',
            '5~月~',
            '6~月~',
            '7~月~',
            '8~月~',
            '9~月~',
            '10~月~',
            '11~月~',
            '12~月~'
          ],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['~电竞数据~', '~小游戏数据~', '~主播数据~']
        },
        series: [
          {
            name: '~电竞数据~',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: Market,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '~小游戏数据~',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: Smart,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: '~主播数据~',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#8543e0',
                lineStyle: {
                  color: '#8543e0',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: Anchor,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  background: #fff;
  padding-top: 20px;
}
</style>
