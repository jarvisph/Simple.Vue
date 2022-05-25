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
        url: 'auth/admin/list',
        cols: [{
          name: 'ID',
          title: '编号'
        },
        {
          name: 'AdminName',
          title: '管理员名称'
        },
        {
          name: 'NickName',
          title: '昵称'
        },
        {
          name: 'RoleID',
          title: '所属角色'
        },
        {
          name: 'CreateAt',
          title: '创建时间',
          template: (d) => this.$htmlFunction.datetime(d.CreateAt)
        },
        {
          name: 'LoginAt',
          title: '登录时间',
          template: (d) => this.$htmlFunction.datetime(d.LoginAt)
        },
        {
          name: 'Status',
          title: '状态'
        }
        ]
      }
    }
  }
}

</script>
