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
        url: '/translate/content/list',
        cols: [{
          name: 'Word',
          title: '词汇'
        },
        {
          name: 'Channel',
          title: '频道'
        },
        {
          name: 'CHN',
          title: '简体中文',
          template: (d) => d.Translate.CHN
        },
        {
          name: 'ENG',
          title: '英文',
          template: (d) => d.Translate.ENG
        },
        {
          name: 'THN',
          title: '繁体中文',
          template: (d) => d.Translate.THN
        },
        {
          name: 'JP',
          title: '日语',
          template: (d) => d.Translate.JP
        },
        {
          name: 'KR',
          title: '韩语',
          template: (d) => d.Translate.KR
        }
        ]
      }
    }
  }
}

</script>
