<template>
  <div>
    <table-page :options="table" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      table: {
        url: '/translate/channel/list',
        cols: [
          { name: 'Channel', title: '频道' },
          { name: 'Name', title: '名称' },
          { name: 'CreateAt', title: '创建时间' },
          { name: 'Status', title: '状态' }
        ]
      }
    }
  }
}
</script>
