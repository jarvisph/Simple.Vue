<template>
  <div class="toolbar-container">
    <div style="display: flex;width: 50px;justify-content: space-between;">
      <el-icon :size="20" class="el-dropdown-link" @click="global.UpdateLayoutCollapse">
        <Expand v-if="global.Layout.Collapse" />
        <Fold v-else />
      </el-icon>
      <el-icon :size="20" class="el-dropdown-link" @click="onRefresh">
        <RefreshRight />
      </el-icon>
    </div>
    <div>
      <el-dropdown @command="onChange">
        <div style="display: flex; align-items: center">
          <div>
            <el-avatar :size="30" :src="user.Info.Face" />
          </div>
          <div>
            <span class="el-dropdown-link">{{ user.Info.AdminName }}</span>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    GlobalStore
  } from "@/stores/global";
  import {
    Fold,
    Expand,
    RefreshRight
  } from "@element-plus/icons-vue";
  import {
    useRouter
  } from "vue-router";
  import {
    UserStore
  } from "@/stores/user";
  import {
    nextTick
  } from "vue";
  const router = useRouter();
  const user = UserStore();
  const global = GlobalStore();
  const onChange = (command: string | number | object) => {
    switch (command) {
      case "profile":
        router.push({
          path: command
        });
        break;
      case "logout": {
        user.Logout()
        router.push({
          path: '/login'
        })
      }
      break;
    }
  };
  const onRefresh = () => {
      router.replace({
        path:"redirect"+ router.currentRoute.value.fullPath
      })
  }
</script>