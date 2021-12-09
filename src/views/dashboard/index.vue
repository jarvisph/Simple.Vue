<template>
  <div class="dashboard-editor-container">
    <panel-group
      class="permission"
      check-permission="02084336491a42a895996996a186e65d"
      @handleSetLineChartData="handleSetLineChartData"
    />
    <line-chart :chart-data="lineChartData" />
    <user-match />
    <news />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: {
        Market: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Smart: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Anchor: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        VisualSport: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSetLineChartData(type) {
      // this.lineChartData = lineChartData[type]
    },
    getData() {
      this.$form('report/home/Month').then((res) => {
        this.lineChartData = res.info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
