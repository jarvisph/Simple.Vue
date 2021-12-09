<template>
  <div style="overflow:auto;height:calc(90vh);">
    <el-card style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>关于我</span>
        <el-button icon="el-icon-coin" size="mini" title="重置密码" circle @click="handleResetPwd" />
        <el-button
          v-if="user.status==='normal'"
          icon="el-icon-unlock"
          size="mini"
          title="正常"
          circle
          @click="handleLock"
        />
        <el-button
          v-if="user.status==='locking'"
          icon="el-icon-lock"
          size="mini"
          title="锁定"
          circle
          @click="handleUnLock"
        />
      </div>

      <div class="user-profile">
        <div class="box-center">
          <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
            <div>Hello</div>
          </pan-thumb>
        </div>
        <div class="box-center">
          <div class="user-name text-center">{{ user.name }}</div>
          <div
            class="user-time text-center"
          >注册时间：{{ user.creationTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</div>
          <div class="user-role text-center text-muted" />
          <div class="user text-center">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="/file/uploadicon"
              :auto-upload="true"
            >
              <el-button slot="trigger" size="small" type="primary">修改头像</el-button>
            </el-upload>
          </div>
        </div>
      </div>
      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="education" />
            <span>信息绑定</span>
          </div>
          <div class="user-bio-section-body">
            <div class="user-section-item">
              <div style="width: 70%;">
                <span class="item-label-title">手机：</span>
                {{ user.phoneNumber }}
              </div>
              <div>
                <el-button type="success" size="mini" icon="el-icon-mobile-phone">绑定手机</el-button>
              </div>
            </div>
            <div class="user-section-item">
              <div style="width: 70%;">
                <span class="item-label-title">邮箱：</span>
                {{ user.emailAddress }}
              </div>
              <div>
                <el-button type="primary" size="mini" icon="el-icon-tickets">绑定邮箱</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="skill" />
            <span>基本资料</span>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <span class="item-label-title">用户名：</span>
              <span>{{ user.userName }}</span>
            </div>
            <div v-if="user.initPassword" class="progress-item">
              <span class="item-label-title">初始密码：</span>
              <span>{{ user.initPassword }}</span>
            </div>
            <div class="progress-item">
              <span class="item-label-title">所属机构：</span>
              <span v-for="item in user.organizations">{{ item }}</span>
            </div>
            <div class="progress-item">
              <span class="item-label-title">所属角色：</span>
              <span v-for="item in user.roles">{{ item }}</span>
            </div>
            <div class="progress-item">
              <span class="item-label-title">最后登陆时间：</span>
              <span>{{ user.lastLoginTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </div>
            <div class="progress-item">
              <span class="item-label-title">介绍：</span>
              <span>{{ user.introduction }}</span>
            </div>
          </div>
        </div>
        <div class="user-location user-bio-section">
          <div class="user-bio-section-header">
            <i class="el-icon-location" />
            <span>常用登陆地址</span>
          </div>
          <div class="user-bio-section-body">
            <div v-for="item in user.ips" class="progress-item">
              <span>{{ item.ip }}</span>
              <span>{{ item.address }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import UserAvatar from './UserAvatar'
import PanThumb from '@/components/PanThumb'
import { parseTime } from '@/utils'
export default {
  components: { PanThumb, UserAvatar },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: undefined,
          name: '',
          avatar: '',
          introduction: '',
          phoneNumber: '',
          emailAddress: '',
          creationTime: '',
          lastLoginTime: '',
          userName: '',
          roles: [],
          organizations: [],
          ips: []
        }
      }
    }
  },
  data() {
    return {
      dialogUserAvatarVisible: false
    }
  },
  methods: {
    handleResetPwd: function() {
      this.$confirm('确认重置用户密码', '提示', {
        confirmButtonText: '确认',
        canceButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const loading = this.$loading({ text: '正在重置随机密码' })
        resetPwd(this.user.id)
          .then(response => {
            loading.close()
            this.$notify({
              title: response.success ? '成功' : '失败',
              message: response.message,
              type: response.success ? 'success' : 'error'
            })
          })
          .catch(error => {
            console.error(error)
            loading.close()
          })
      })
    },
    handleLock() {
      this.$confirm('确定锁定用户（锁定后，用户将无法登陆系统）', '提示', {
        confirmButtonText: '确认',
        canceButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const loading = this.$loading({ text: '正在锁定用户' })
        lock(this.user.id).then(response => {
          loading.close()
          if (response.success) this.user.status = 'locking'
          this.$notify({
            title: response.success ? '成功' : '失败',
            message: response.message,
            type: response.success ? 'success' : 'error'
          })
        })
      })
    },
    handleUnLock() {
      this.$confirm('确定解锁用户（解锁后，用户可正常登陆系统）', '提示', {
        confirmButtonText: '确认',
        canceButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const loading = this.$loading({ text: '正在解锁' })
        unLock(this.user.id).then(response => {
          loading.close()
          if (response.success) this.user.status = 'normal'
          this.$notify({
            title: response.success ? '成功' : '失败',
            message: response.message,
            type: response.success ? 'success' : 'error'
          })
        })
      })
    },
    handleUpload() {
      this.dialogUserAvatarVisible = true
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

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
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
