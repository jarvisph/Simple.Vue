<template>
  <div class="upload-container">
    <el-upload
      class="avatar-uploader"
      :action="url"
      :show-file-list="false"
      :on-success="success"
      :before-upload="beforeUpload"
      :headers="headers"
    >
      <img v-if="src" :src="src" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/global'
export default {
  name: 'UploadImage',
  props: {
    value: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  computed: {
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  mounted() {},
  created() {},
  methods: {
    success(row) {
      if (row.success) {
        this.$message({ type: 'success', message: '上传成功' })
      } else {
        this.$message.error('上传失败')
      }
      this.$emit('success', row.info)
    },
    beforeUpload() {}
  }
}
</script>

<style lang="scss" scoped>
.upload-container {
  width: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
