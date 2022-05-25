<template>
  <div class="app">
    <table-page :options="table" :search="true" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: {
        url: 'signalr/application/list',
        cols: [
          { name: 'AppKey', title: 'AppKey' },
          { name: 'Name', title: '应用名称' },
          { name: 'CreateAt', title: '创建时间' },
          { name: 'Status', title: '状态' }
        ]
      }
    }
  }
}

</script>
