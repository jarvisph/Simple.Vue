<template>
  <el-row :gutter="10" class="panel-group">
    <el-col
      v-for="item in data"
      :key="item.type"
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
    >
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">{{ item.title }}</div>
          <div class="card-panel-refresh">
            <el-radio-group
              v-model="item.Interval"
              size="mini"
              @change="handleChange(item)"
            >
              <el-radio-button label="Day">~当天~</el-radio-button>
              <el-radio-button label="Week">~本周~</el-radio-button>
              <el-radio-button label="Month">~本月~</el-radio-button>
            </el-radio-group>
          </div>
        </div>
        <div class="card-panel-content">
          <el-row :gutter="20">
            <el-col :span="10">
              <i class="am-icon-circle el-text-blue el-text-ft10" />
              ~投注金额~
              <count-to
                :start-val="0"
                :end-val="item.BetMoney"
                :duration="3000"
                class="card-panel-num"
              />
            </el-col>
            <el-col :span="10">
              <i class="am-icon-circle el-text-green el-text-ft10" />
              ~有效金额~
              <count-to
                :start-val="0"
                :end-val="item.BetAmount"
                :duration="3000"
                class="card-panel-num"
              />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <i class="am-icon-circle el-text-red el-text-ft10" />
              ~盈亏金额~
              <count-to
                :start-val="0"
                :end-val="item.BetProfit"
                :duration="3000"
                class="card-panel-num"
              />
            </el-col>
            <el-col :span="10">
              <i class="am-icon-circle el-text-purple el-text-ft10" />
              ~订单总量~
              <count-to
                :start-val="0"
                :end-val="item.BetCount"
                :duration="3000"
                class="card-panel-num"
              />
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  data() {
    return {
      data: [
        {
          title: '~电竞数据~',
          type: 'Market',
          Interval: 'Day',
          BetMoney: 0,
          BetAmount: 0,
          BetProfit: 0,
          BetCount: 0
        },
        {
          title: '~小游戏数据~',
          type: 'Smart',
          Interval: 'Day',
          BetMoney: 0,
          BetAmount: 0,
          BetProfit: 0,
          BetCount: 0
        },
        {
          title: '~主播数据~',
          type: 'Anchor',
          Interval: 'Day',
          BetMoney: 0,
          BetAmount: 0,
          BetProfit: 0,
          BetCount: 0
        },
        {
          title: '~虚拟电竞数据~',
          type: 'VisualSport',
          Interval: 'Day',
          BetMoney: 0,
          BetAmount: 0,
          BetProfit: 0,
          BetCount: 0
        }
      ]
    }
  },
  created() {
    this.data.forEach((item) => {
      this.getOrder(item)
    })
  },
  mounted() {},
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getOrder(item) {
      this.$form('report/home/order', item).then((res) => {
        item.BetMoney = res.info.BetMoney
        item.BetAmount = res.info.BetAmount
        item.BetProfit = res.info.BetProfit
        item.BetCount = res.info.BetCount
      })
    },
    handleChange(row) {
      this.getOrder(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 10px;
  }
  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-top: 10px;
  }
  .card-panel {
    height: 130px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-content {
      margin-left: 20px;
      margin-top: 20px;
      .el-row {
        margin-top: 20px;
      }
    }
    .card-panel-description {
      border-bottom: 1px solid #f6f6f6;
      height: 35px;
      .card-panel-text {
        width: 40%;
        padding: 10px 0 5px 10px;
        line-height: 14px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        position: absolute;
      }
      .card-panel-refresh {
        width: 60%;
        float: right;
        .el-radio-group {
          padding-top: 3px;
          float: right;
          padding-right: 3px;
        }
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
