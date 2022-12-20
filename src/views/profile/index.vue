<template>
  <el-card class="profile-view">
    <div class="">
      <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-success="onSuccess"
        :before-upload="onUpload"
      >
        <img v-if="user.Info.Face" :src="user.Info.Face" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <h5>{{ user.Info.AdminName }}</h5>
    <span>{{ user.Info.CreateAt }}</span>
  </el-card>
</template>

<script lang="ts" setup>
import { UserStore } from "@/stores/user";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
const user = UserStore();
const onSuccess = () => {};
const onUpload = () => {};
</script>

<style>
.el-card.profile-view {
  width: 40% !important;
  margin: auto;
}
.el-card.profile-view .el-card__body{
    text-align: center;
}
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.el-upload__input {
  display: none !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
