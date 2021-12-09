<template>
  <div class="icons-container">
    <aside>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
      >Add and use</a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Icons">
        <div
          v-for="item of svgIcons"
          :key="item"
          @click="handleClipboard(generateIconCode(item),$event)"
        >
          <el-tooltip placement="top">
            <div slot="content">{{ generateIconCode(item) }}</div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Element-UI Icons">
        <div
          v-for="item of elementIcons"
          :key="item"
          @click="handleClipboard(generateElementIconCode(item),$event)"
        >
          <el-tooltip placement="top">
            <div slot="content">{{ generateElementIconCode(item) }}</div>
            <div class="icon-item">
              <i :class="'el-icon-' + item" />
              <span>{{ item }}</span>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import svgIcons from './svg-icons'
import elementIcons from './element-icons'
import * as signalR from '@aspnet/signalr'

export default {
  name: 'Icons',
  data() {
    return {
      svgIcons,
      elementIcons
    }
  },
  created() {
    const thisVue = this
    // 1、实例化连接器
    thisVue.connection = new signalR.HubConnectionBuilder()
      // 配置通道路由
      .withUrl('/api/chatHub')
      // 日志信息
      .configureLogging(signalR.LogLevel.Information)
      // 创建
      .build()
    thisVue.connection.on('ReceiveMessage', function(user, message) {
      thisVue.messages.push({ user, message })
    })
    thisVue.connection.on('ReceiveUpdate', function(update) {
      console.info('update success!')
      thisVue.listLoading = false
      thisVue.postMessage = update
      window.clearInterval(this.t)
    })
  },
  mounted() {
    const thisvue = this
    thisvue.connection.start().then(() => {
      var ran = Math.random()
      thisvue.connection.invoke('GetLatestCount', ran).catch(function(err) {
        return console.error(err)
      })
    })
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="el-icon-${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
  }

  span {
    display: block;
    font-size: 16px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
