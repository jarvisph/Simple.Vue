<template>
  <div class="app" style="width: 440px; margin: auto">
    <el-card>
      <div slot="header" class="clearfix">
        <span>~关于我~</span>
      </div>

      <div class="user-profile">
        <div class="box-center">
          <pan-thumb
            :image="Face"
            :height="'100px'"
            :width="'100px'"
            :hoverable="false"
          >
            <div>{{ NickName }}</div>
          </pan-thumb>
        </div>
        <div class="box-center">
          <div class="user-name text-center">{{ NickName }}</div>
          <div class="user-time text-center">~注册时间~：{{ CreateAt }}</div>
          <div class="user-role text-center text-muted" />
          <div class="user text-center">
            <el-button
              size="mini"
              icon="el-icon-mobile-phone"
              @click="handlePassword"
            >~修改密码~</el-button>
          </div>
        </div>
      </div>
      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="education" />
            <span>~信息绑定~</span>
          </div>
          <div class="user-bio-section-body">
            <div class="user-section-item">
              <div style="width: 70%">
                <span class="item-label-title">~谷歌验证码~</span>
              </div>
              <div>
                <el-button
                  v-if="!Code"
                  type="success"
                  size="mini"
                  icon="el-icon-mobile-phone"
                  @click="handleCode"
                >~绑定验证码~</el-button>
                <span
                  v-if="Code"
                  class="el-text-green"
                ><i class="el-icon-check" /> ~已绑定~</span>
              </div>
            </div>
          </div>
        </div>

        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="skill" />
            <span>~基本资料~</span>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <span class="item-label-title">~用户名~：</span>
              <span>{{ UserName }}</span>
            </div>
            <div class="progress-item">
              <span class="item-label-title">~权限分组~：</span>
              <span>{{ GroupID }}</span>
            </div>
            <div class="progress-item">
              <span class="item-label-title">~最后登陆时间~：</span>
              <span>{{ LoginAt }}</span>
            </div>
            <div class="progress-item">
              <span class="item-label-title">~最后登陆地址~：</span>
              <span>{{ LoginIP }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <!--绑定谷歌验证码-->
    <form-info
      title="~绑定谷歌验证码~"
      :visible="dialogVisible"
      action="merchant/account/SaveCode"
      :model="temp"
      @close="dialogVisible = false"
      @success="Code = true"
    >
      <template slot="form">
        <el-form label-width="80px">
          <el-form-item label="~扫一扫~">
            <el-avatar shape="square" :size="250" :src="QRCode" />
          </el-form-item>
          <el-form-item label="~验证码~">
            <el-input v-model="temp.Code" placeholder="~请输入验证码~" />
          </el-form-item>
        </el-form>
      </template>
    </form-info>
    <!--修改密码-->
    <form-info
      title="~修改密码~"
      :visible="passwordVisible"
      action="merchant/account/Password"
      :model="passwordInfo"
      @close="passwordVisible = false"
    >
      <template slot="form">
        <el-form-item label="~旧密码~">
          <el-input
            v-model="passwordInfo.OldPassword"
            type="password"
            placeholder="~请输入旧密码~"
          />
        </el-form-item>
        <el-form-item label="~新密码~">
          <el-input
            v-model="passwordInfo.NewPassword"
            type="password"
            placeholder="~请输入新密码~"
          />
        </el-form-item>
        <el-form-item label="~确认密码~">
          <el-input
            v-model="passwordInfo.ConfirPassword"
            type="password"
            placeholder="~确认密码~"
          />
        </el-form-item>
      </template>
    </form-info>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
export default {
  name: 'Profile',
  components: { PanThumb },
  data() {
    return {
      dialogVisible: false,
      QRCode: undefined,
      loading: false,
      temp: {
        Key: undefined,
        Code: undefined
      },
      passwordVisible: false,
      passwordInfo: {
        OldPassword: undefined,
        NewPassword: undefined,
        ConfirPassword: undefined
      }
    }
  },
  computed: {
    ...mapGetters([
      'NickName',
      'Face',
      'UserName',
      'GroupID',
      'CreateAt',
      'LoginAt',
      'LoginIP',
      'Code'
    ])
  },
  created() {},
  methods: {
    handleCode() {
      this.dialogVisible = true
      this.$form('merchant/account/codeinfo').then((res) => {
        if (res.success) {
          this.temp.Key = res.info.Key
          this.QRCode =
            this.$store.state.settings.qrcode + '?content=' + res.info.Code
        } else {
          this.$message({ message: res.msg, type: 'error' })
        }
      })
    },
    handlePassword() {
      this.passwordVisible = true
      this.passwordInfo = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }
  .user-time {
    font-size: 12px;
    color: #606266;
    padding-top: 5px;
  }
  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
}
.item-label-title {
  font-weight: 600;
}
.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;
    .user-section-item {
      padding-bottom: 10px;
      display: flex;
      align-items: center;
    }
    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.progress-item {
  padding-top: 20px;
}
</style>
