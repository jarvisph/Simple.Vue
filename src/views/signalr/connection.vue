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
        url: 'signalr/connection/list',
        cols: [{
          name: 'AppKey',
          title: 'AppKey',
          width: 250
        },
        {
          name: 'ConnectionID',
          title: 'ID'
        },
        {
          name: 'IP',
          title: 'IP'
        },
        {
          name: 'CreateAt',
          title: '连接时间'
        },
        {
          name: 'DisconnectAt',
          title: '断开时间'
        },
        {
          name: 'IsOnline',
          title: '是否在线'
        }
        ]
      }
    }
  }
}

</script>
