<template>
  <div class="app">
    <el-input v-model="content" placeholder="内容" />
    <el-button @click="onGenerate">生成</el-button>
    <el-image :src="src" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
      src: ''
    }
  },
  methods: {
    onGenerate: function() {
      if (this.content === '') {
        this.$message({
          message: '请输入内容',
          type: 'error'
        })
      } else {
        this.src = `utils/qrcode?content=${this.content}`
      }
    }
  }
}

</script>
