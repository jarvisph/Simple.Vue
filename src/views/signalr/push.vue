<template>
  <div class="app">
    <table-page :options="table" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        url: 'signalr/push/list',
        cols: [
          { name: 'AppKey', title: 'AppKey' },
          { name: 'ConnectionID', title: '连接ID' },
          { name: 'Channel', title: '频道' },
          { name: 'CreateAt', title: '推送时间' }
        ]
      }
    }
  }
}
</script>
