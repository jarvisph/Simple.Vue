<template>
  <div class="login-view">
    <div class="login-box">
      <div class="head">
        <img src="@/assets/login-header.png" />
      </div>
      <div class="form">
        <img class="profile-avatar" src="@/assets/default-face.png" />
        <div class="content">
          <el-form :model="form">
            <el-form-item>
              <el-input
                v-model="form.UserName"
                placeholder="输入用户名"
                clearable
              >
                <template #prefix>
                  <i class="am-icon-user"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.Password"
                placeholder="输入密码"
                type="password"
                show-password
              >
                <template #prefix>
                  <i class="am-icon-lock"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.Code"
                placeholder="验证码"
                clearable
                class="width-50"
                maxlength="6"
              >
                <template #prefix>
                  <i class="am-icon-ellipsis-h"></i>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="width-100"
                round
                :disabled="state.disabled"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch } from "vue";

const state = reactive({
  disabled: true,
});
const form = reactive({
  UserName: "",
  Password: "",
  Code: "",
});
const verify = () => {
  
};
watch(
  () => form.UserName,
  () => {
    verify();
  }
);
</script>

<style>
body {
  background: url("@/assets/login-bg.jpg") repeat;
}
.login-view {
  position: absolute;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
}
.login-view .login-box {
  overflow: hidden;
  width: 430px;
  padding: 0;
  background-color: white;
  margin-bottom: 80px;
}
.login-view .login-box .head {
  background: #ccccff;
}
.login-view .login-box .head img {
  display: block;
  width: 430px;
  margin: 0 auto;
  user-select: none;
}
.login-view .login-box .form {
  position: relative;
}
.login-view .login-box .content {
  padding: 100px 40px 40px;
}
.login-view .login-box .profile-avatar {
  display: block;
  position: absolute;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  top: -50px;
  right: calc(50% - 50px);
  z-index: 2;
  user-select: none;
}
</style>
