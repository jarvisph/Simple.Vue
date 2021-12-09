<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">管理后台模板</h3>
        <div class="description">
          <span v-for="(item, index) in languages" :key="index" class="item">
            <a href="javascript:void(0)" @click="loadLanauge(index)">{{
              item
            }}</a>
          </span>
        </div>
      </div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <template slot="prefix">
            <i class="el-icon-user login-svg" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @blur="capsTooltip = false"
          @keyup.enter.native="handleLogin"
        >
          <template slot="prefix">
            <i class="el-icon-lock login-svg" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          type="text"
          placeholder="验证码"
          name="code"
          tabindex="3"
          autocomplete="on"
        >
          <template slot="prefix">
            <i class="el-icon-key login-svg" />
          </template>
        </el-input>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
    <div class="login-bottom">
      <div class="bottom-item">
        © 2020 AVIA 1600 Amphitheatre Parkway, Mountain View, CA 94043, United
        States
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername, validPassword } from '@/utils/validate'
import { Language } from '@/utils/global'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error('用户名不能为空'))
      } else if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error('密码不能为空'))
      } else if (!validPassword(value)) {
        callback(new Error('请输入正确的密码，长度不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      languages: {
        CHN: '简体中文',
        ENG: 'English',
        THN: '正體中文'
        // JP: '日本語'
        // DE: 'Deutsch',
        // ES: 'Español',
        // FR: 'Français',
        // ID: 'indonesia',
        // IT: 'Italiano',
        // KR: '한국어',
        // PT: 'Português',
        // RU: 'Русский',
        // TH: 'ไทย',
        // VN: 'Tiếng việt'
      },
      language: 'CHN',
      loginForm: {
        username: undefined,
        password: undefined,
        code: undefined
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },

  methods: {
    loadLanauge(lang) {
      this.language = lang
      Language(lang)
      location.reload()
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;

  .login-form {
    position: relative;
    width: 460px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .login-svg {
    padding-left: 3px;
    color: #1890ff;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: rgba(0, 0, 0, 0.85);
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
    .description {
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      .item {
        font-size: 12px;
        padding-left: 10px;
      }
      .item a:hover {
        color: dimgray;
      }
    }
  }
  .login-bottom {
    width: 100%;
    position: fixed;
    z-index: 302;
    bottom: 0;
    left: 0;
    height: 39px;
    padding-top: 1px;
    overflow: hidden;
    zoom: 1;
    margin: 0;
    line-height: 39px;
    background: #fff;
    .bottom-item {
      text-align: center;
      color: #bbb;
      font-size: 12px;
    }
  }
}
</style>
